import pool from '@/config/database'
import { IDbConnection } from '@/domain/interfaces/DbConnection/IDbConnection'

export class PostgresDbConnection implements IDbConnection {
  async beginTransaction(): Promise<void> {
    await pool.query('BEGIN')
  }
  async rollback(): Promise<void> {
    await pool.query('ROLLBACK')
  }
  async commit(): Promise<void> {
    await pool.query('COMMIT')
  }
  getInstance<T>(): T {
    return pool as T
  }
  async closeConnection(): Promise<void> {
    await pool.end()
  }
}
