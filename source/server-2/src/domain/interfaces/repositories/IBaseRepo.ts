import { BaseEntity } from '../../entities/BaseEntity'
import { IDbConnection } from './IDbConnection'

export interface IBaseRepo<T extends BaseEntity> {
  openConnection(): Promise<IDbConnection>
  findById(id: string, dbConnection?: IDbConnection): Promise<T | null>
  findAll(dbConnection?: IDbConnection): Promise<T[]>
  create(entity: Partial<T>, dbConnection?: IDbConnection): Promise<T>
  update(id: string, entity: Partial<T>, dbConnection?: IDbConnection): Promise<T | null>
  delete(id: string, dbConnection?: IDbConnection): Promise<boolean>
}
