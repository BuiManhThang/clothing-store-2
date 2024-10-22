import { IBaseRepo } from '../../domain/interfaces/repositories/IBaseRepo'
import pool from '../../config/database'
import { BaseEntity } from '../../domain/entities/BaseEntity'
import { IDbConnection } from '../../domain/interfaces/repositories/IDbConnection'
import { PoolClient } from 'pg'
import { PostgresDbConnection } from './PostgresDbConnection'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../shared/types/paginationType'
import { Condition, Operator, SortDirection } from '../../shared/enums/paginationEnum'

export class BasePostgresRepo<T extends BaseEntity> implements IBaseRepo<T> {
  readonly _tableName: string

  constructor(tableName: string) {
    this._tableName = tableName
  }

  async openConnection(): Promise<IDbConnection> {
    const poolClient = await pool.connect()
    return new PostgresDbConnection(poolClient)
  }

  async getEntity(
    dbQueryBuilder: DbQueryBuilder<T>,
    dbConnection?: IDbConnection
  ): Promise<T | null> {
    const columns = dbQueryBuilder.columns?.length
      ? dbQueryBuilder.columns.map((col) => `"${col.toString()}"`).join(', ')
      : '*'
    const values: any[] = []
    const tableName = this._getTableName(dbQueryBuilder, values)
    const where = this._getWhere(dbQueryBuilder.filterObjects || [], values)

    const query = `SELECT ${columns} FROM ${tableName} ${where ? ` WHERE ${where}` : ''} LIMIT 1`

    const result = await this._query(query, values, dbConnection)

    if (result.rows.length) return result.rows[0]
    return null
  }

  async getEntities(dbQueryBuilder: DbQueryBuilder<T>, dbConnection?: IDbConnection): Promise<T[]> {
    const columns = dbQueryBuilder.columns?.length
      ? dbQueryBuilder.columns.map((col) => `"${col.toString()}"`).join(', ')
      : '*'
    const values: any[] = []
    const tableName = this._getTableName(dbQueryBuilder, values)
    const where = this._getWhere(dbQueryBuilder.filterObjects || [], values)

    let offsetLimit = ''
    if (dbQueryBuilder.pageIndex && dbQueryBuilder.pageSize) {
      let offset = (dbQueryBuilder.pageIndex - 1) * dbQueryBuilder.pageSize
      let limit = dbQueryBuilder.pageSize
      offsetLimit = `LIMIT $${values.length + 1} OFFSET $${values.length + 2}`
      values.push(limit, offset)
    }

    const sort = this._getSort(dbQueryBuilder.sortObjects || [])

    const query = `SELECT ${columns} FROM ${tableName} ${where ? ` WHERE ${where}` : ''}${
      sort ? ` ORDER BY ${sort}` : ''
    }${offsetLimit ? ` ${offsetLimit}` : ''}`

    const result = await this._query(query, values, dbConnection)
    return result.rows
  }

  async getPagination(
    dbQueryBuilder: DbQueryBuilder<T>,
    dbConnection?: IDbConnection
  ): Promise<PaginationResult<T>> {
    const columns = dbQueryBuilder.columns?.length
      ? dbQueryBuilder.columns.map((col) => `"${col.toString()}"`).join(', ')
      : '*'
    const values: any[] = []
    const tableName = this._getTableName(dbQueryBuilder, values)
    const where = this._getWhere(dbQueryBuilder.filterObjects || [], values)

    let offsetLimit = ''
    if (dbQueryBuilder.pageIndex && dbQueryBuilder.pageSize) {
      let offset = (dbQueryBuilder.pageIndex - 1) * dbQueryBuilder.pageSize
      let limit = dbQueryBuilder.pageSize
      offsetLimit = `LIMIT $${values.length + 1} OFFSET $${values.length + 2}`
      values.push(limit, offset)
    }

    const sort = this._getSort(dbQueryBuilder.sortObjects || [])

    const query = `SELECT ${columns}, COUNT(*) OVER() AS total_count FROM ${tableName} ${
      where ? ` WHERE ${where}` : ''
    }${sort ? ` ORDER BY ${sort}` : ''}${offsetLimit ? ` ${offsetLimit}` : ''}`

    const result = await this._query(query, values, dbConnection)

    const paginationResult: PaginationResult<T> = {
      items: result.rows,
      total: result.rows.length > 0 ? parseInt(result.rows[0].total_count) : 0,
    }

    return paginationResult
  }

  async create(entity: Partial<T>, dbConnection?: IDbConnection): Promise<T> {
    const { keys, values } = this.#getKeysAndValues(entity)

    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ')

    const query = `INSERT INTO "${this._tableName}" (${keys.join(
      ', '
    )}) VALUES (${placeholders}) RETURNING *`

    const result = await this._query(query, values, dbConnection)
    return result.rows[0]
  }

  async update(id: string, entity: Partial<T>, dbConnection?: IDbConnection): Promise<T | null> {
    const { keys, values } = this.#getKeysAndValues(entity)
    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ')

    const query = `UPDATE "${this._tableName}" SET ${setClause} WHERE "id" = $1 RETURNING *`

    const result = await this._query(query, [id, ...values], dbConnection)
    return result.rows.length > 0 ? result.rows[0] : null
  }

  async findById(id: string, dbConnection?: IDbConnection): Promise<T | null> {
    const query = `SELECT * FROM "${this._tableName}" WHERE "id" = $1`

    const result = await this._query(query, [id], dbConnection)
    return result.rows.length > 0 ? result.rows[0] : null
  }

  async findAll(dbConnection?: IDbConnection): Promise<T[]> {
    const query = `SELECT * FROM "${this._tableName}"`

    const result = await this._query(query, undefined, dbConnection)
    return result.rows
  }

  async delete(id: string, dbConnection?: IDbConnection): Promise<boolean> {
    const query = `DELETE FROM "${this._tableName}" WHERE "id" = $1`

    const result = await this._query(query, [id], dbConnection)
    return !!result.rowCount
  }

  async _query(query: string, values?: unknown[], dbConnection?: IDbConnection) {
    let db = dbConnection
    if (!db) db = await this.openConnection()
    try {
      const queryClient: PoolClient = db.getQueryClient()
      return await queryClient.query(query, values)
    } finally {
      if (!dbConnection) db.closeConnection()
    }
  }

  _getTableName(dbQueryBuilder: DbQueryBuilder<T>, values: any[]) {
    if (typeof dbQueryBuilder.getTableName === 'function') {
      return dbQueryBuilder.getTableName(values)
    }
    return `"${this._tableName}"`
  }

  _getWhere(filterObjects: FilterObject<T>[], values: any[]) {
    const filterObjectsLength = filterObjects.length
    if (!filterObjectsLength) {
      return ''
    }
    let where = ''

    filterObjects.forEach((filterObject, index) => {
      if (filterObject.column && filterObject.operator) {
        let value = this.#getValue(filterObject)
        let column = `"${filterObject.column.toString()}"`

        values.push(value)

        where = `${where ? where + ' ' : ''}${column} ${this.#getOperator(
          filterObject.operator
        )} $${values.length}`
      } else if (filterObject.filterObjects?.length) {
        where = `${where ? where + ' ' : ''}(${this._getWhere(filterObject.filterObjects, values)})`
      }
      if (filterObject.condition && index < filterObjectsLength - 1) {
        where = `${where ? where + ' ' : ''}${this.#getCondition(filterObject.condition)}`
      }
    })

    return where.trim()
  }

  _getSort(sortObjects: SortObject<T>[]) {
    if (!sortObjects.length) return ''
    return sortObjects
      .map(
        (sortObject) =>
          `"${sortObject.column.toString()}" ${this.#getSortDirection(sortObject.direction)}`
      )
      .join(', ')
  }

  #getSortDirection(sortDirection: SortDirection) {
    switch (sortDirection) {
      case SortDirection.Asc:
        return 'ASC'
      default:
        return 'DESC'
    }
  }

  #getKeysAndValues(entity: Partial<T>) {
    const keys = Object.keys(entity).map((key) => `"${key}"`)
    const values = Object.values(entity).map((value) => {
      if (typeof value === 'object' && !(value instanceof Date)) {
        return JSON.stringify(value)
      } else {
        return value
      }
    })

    return {
      keys,
      values,
    }
  }

  #getOperator(operator: Operator) {
    switch (operator) {
      case Operator.Equals:
        return '='
      case Operator.NotEquals:
        return '!='
      case Operator.Greater:
        return '>'
      case Operator.Less:
        return '<'
      case Operator.GreaterOrEquals:
        return '>='
      case Operator.LessOrEquals:
        return '<='
      case Operator.Contains:
        return 'LIKE'
      default:
        return undefined // Trả về undefined nếu không có trường hợp nào khớp
    }
  }

  #getCondition(condition: Condition) {
    switch (condition) {
      case Condition.And:
        return 'and'
      case Condition.Or:
        return 'or'
      default:
        return undefined // Trả về undefined nếu không có trường hợp nào khớp
    }
  }

  #getValue(filterObject: FilterObject<T>) {
    let formattedValue = filterObject.value

    if (filterObject.operator === Operator.Contains) {
      formattedValue = `%${formattedValue}%`
    }

    return formattedValue
  }
}
