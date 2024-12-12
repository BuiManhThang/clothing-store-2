import { BaseEntity } from '@/domain/entities/BaseEntity'
import { IDbConnection } from '../DbConnection/IDbConnection'

export interface IBaseRepository<T extends BaseEntity> {
  findById(id: string): Promise<T | null>
  findAll(): Promise<T[]>
  create(entity: T): Promise<T>
  update(id: string, entity: T): Promise<T>
  delete(id: string): Promise<boolean>
}
