import dotenv from 'dotenv'
dotenv.config()

// src/codeGenerator.ts
import * as fs from 'fs-extra'
import * as Handlebars from 'handlebars'
import { getTables, getColumns } from './dbUtils'

const templatesPath = './templates' // Đường dẫn đến các template
const outputPath = './src/generated' // Nơi lưu các file được tạo ra

// Chuyển đổi kiểu dữ liệu của database sang kiểu TypeScript
function mapDbTypeToTsType(dbType: string): string {
  switch (dbType) {
    case 'integer':
      return 'number'
    case 'text':
    case 'varchar':
    case 'uuid':
    case 'character varying':
      return 'string'
    case 'boolean':
      return 'boolean'
    case 'timestamps':
    case 'timestamp without time zone':
      return 'Date'
    default:
      return 'any' // Giả sử không biết thì dùng kiểu any
  }
}

// Đọc và biên dịch template
async function compileTemplate(templatePath: string, context: any): Promise<string> {
  const template = await fs.readFile(templatePath, 'utf8')
  const compiled = Handlebars.compile(template)
  return compiled(context)
}

// Hàm để tạo các file từ bảng database
async function generateCodeForTable(tableName: string) {
  const columns = await getColumns(tableName)

  tableName = getTableName(tableName)
  const context = {
    EntityName: capitalizeFirstLetter(tableName),
    entityName: tableName,
    entityNames: getTableNameMany(tableName),
    EntityNames: capitalizeFirstLetter(getTableNameMany(tableName)),
    columns: columns
      .filter(
        (col) =>
          !['id', 'createdAt', 'createdBy', 'modifiedAt', 'modifiedBy'].includes(col.column_name)
      )
      .map((col) => ({
        column_name: col.column_name,
        data_type: mapDbTypeToTsType(col.data_type),
        EntityName: capitalizeFirstLetter(tableName),
        entityName: tableName,
        entityNames: getTableNameMany(tableName),
        EntityNames: capitalizeFirstLetter(getTableNameMany(tableName)),
      })),
    createDtoColumns: columns
      .filter(
        (col) =>
          !['id', 'createdAt', 'createdBy', 'modifiedAt', 'modifiedBy'].includes(col.column_name)
      )
      .map((col) => ({
        column_name: col.column_name,
        data_type: mapDbTypeToTsType(col.data_type),
        EntityName: capitalizeFirstLetter(tableName),
        entityName: tableName,
        entityNames: getTableNameMany(tableName),
        EntityNames: capitalizeFirstLetter(getTableNameMany(tableName)),
      })),
    createColumns: columns
      .filter(
        (col) =>
          !['id', 'createdAt', 'createdBy', 'modifiedAt', 'modifiedBy'].includes(col.column_name)
      )
      .map((col) => ({
        column_name: col.column_name,
        data_type: mapDbTypeToTsType(col.data_type),
        EntityName: capitalizeFirstLetter(tableName),
        entityName: tableName,
        entityNames: getTableNameMany(tableName),
        EntityNames: capitalizeFirstLetter(getTableNameMany(tableName)),
      })),
  }

  const fileTypes = [
    'entity',
    'repository',
    'createUseCase',
    'updateUseCase',
    'findAllUseCase',
    'findByIdUseCase',
    'deleteUseCase',
    'iRepository',
    'dto',
    'mapper',
    'controller',
    'router',
  ] // Các loại file muốn tạo

  for (const type of fileTypes) {
    const templatePath = `${templatesPath}/${type}.hbs`
    let outputFilePath = `${outputPath}/${type}s/${getFileName(type, tableName)}.ts`
    if (type.includes('UseCase')) {
      outputFilePath = `${outputPath}/use-cases/${tableName}/${getFileName(type, tableName)}.ts`
    }

    const content = await compileTemplate(templatePath, context)
    await fs.outputFile(outputFilePath, content)
  }

  console.log(`Generated code for table: ${tableName}`)
}

async function generateMainRouter(tableNames: string[]) {
  const context = {
    tableNames: tableNames.map((tableName) => ({
      TableName: capitalizeFirstLetter(getTableName(tableName)),
      tableName: getTableName(tableName),
      tableNames: getTableNameMany(tableName),
      TableNames: capitalizeFirstLetter(getTableNameMany(tableName)),
    })),
  }

  const templatePath = `${templatesPath}/mainRouter.hbs`
  let outputFilePath = `${outputPath}/mainRouter.ts`

  const content = await compileTemplate(templatePath, context)
  await fs.outputFile(outputFilePath, content)
}

// Hàm chạy chính
;(async function generateAll() {
  const tables = await getTables()
  generateCodeForTable(tables[0])
  for (const table of tables) {
    await generateCodeForTable(table)
  }

  await generateMainRouter(tables)
})()

// Tiện ích: Hàm viết hoa chữ cái đầu
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function getFileName(type: string, tableName: string) {
  if (tableName === 'categories') tableName = 'category'

  switch (type) {
    case 'entity':
      return `${capitalizeFirstLetter(tableName)}`
    case 'repository':
      return `${capitalizeFirstLetter(tableName)}PostgresRepo`
    case 'iRepository':
      return `I${capitalizeFirstLetter(tableName)}Repo`
    case 'dto':
      return `${capitalizeFirstLetter(tableName)}DTO`
    case 'mapper':
      return `${capitalizeFirstLetter(tableName)}Mapper`
    case 'createUseCase':
      return `Create${capitalizeFirstLetter(tableName)}UseCase`
    case 'updateUseCase':
      return `Update${capitalizeFirstLetter(tableName)}UseCase`
    case 'findAllUseCase':
      return `FindAll${capitalizeFirstLetter(getTableNameMany(tableName))}UseCase`
    case 'findByIdUseCase':
      return `Find${capitalizeFirstLetter(tableName)}ByIdUseCase`
    case 'deleteUseCase':
      return `Delete${capitalizeFirstLetter(tableName)}UseCase`
    case 'controller':
      return `${capitalizeFirstLetter(tableName)}Controller`
    case 'router':
      return `${capitalizeFirstLetter(tableName)}Router`
    default:
      return ''
  }
}

function getTableName(tableName: string) {
  if (tableName === 'categories') return 'category'
  if (tableName === 'productInventory') return 'productInventory'
  return tableName.slice(0, -1)
}

function getTableNameMany(tableName: string) {
  if (tableName === 'categories') return 'categories'
  if (tableName === 'category') return 'categories'
  if (tableName === 'productInventory') return 'productInventory'
  return tableName + 's'
}
