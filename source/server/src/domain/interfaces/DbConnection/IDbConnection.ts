export interface IDbConnection {
  beginTransaction(): Promise<void>
  rollback(): Promise<void>
  commit(): Promise<void>
  getInstance<T>(): T
  closeConnection(): Promise<void>
}
