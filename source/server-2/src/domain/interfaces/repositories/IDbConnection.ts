export interface IDbConnection {
  getQueryClient(): any
  startTransaction(): Promise<void>
  rollback(): Promise<void>
  commit(): Promise<void>
  closeConnection(): void
}
