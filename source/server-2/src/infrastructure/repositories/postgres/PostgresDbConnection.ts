import { PoolClient } from 'pg'
import { IDbConnection } from '../../../domain/interfaces/repositories/IDbConnection'

export class PostgresDbConnection implements IDbConnection {
  readonly #poolClient: PoolClient

  constructor(poolClient: PoolClient) {
    this.#poolClient = poolClient
  }

  getQueryClient() {
    return this.#poolClient
  }

  closeConnection(): void {
    this.#poolClient.release()
  }

  async startTransaction(): Promise<void> {
    await this.#poolClient.query('BEGIN')
  }

  async rollback(): Promise<void> {
    await this.#poolClient.query('ROLLBACK')
  }

  async commit(): Promise<void> {
    await this.#poolClient.query('COMMIT')
  }
}
