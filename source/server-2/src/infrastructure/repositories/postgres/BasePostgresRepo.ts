import pool from '../../../config/database'
import { BaseEntity } from '../../../domain/entities/BaseEntity'
import { IBaseRepo } from '../../../domain/interfaces/repositories/IBaseRepo'
import { IDbConnection } from '../../../domain/interfaces/repositories/IDbConnection'
import { PostgresDbConnection } from './PostgresDbConnection'
import { PoolClient } from 'pg'

export class BasePostgresRepo<T extends BaseEntity> implements IBaseRepo<T> {
  readonly _tableName: string

  constructor(tableName: string) {
    this._tableName = tableName
  }

  async openConnection(): Promise<IDbConnection> {
    const poolClient = await pool.connect()
    return new PostgresDbConnection(poolClient)
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
}
