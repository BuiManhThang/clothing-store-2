import pool from '@/config/database'
import { BaseEntity } from '@/domain/entities/BaseEntity'
import { IDbConnection } from '@/domain/interfaces/DbConnection/IDbConnection'
import { IBaseRepository } from '@/domain/interfaces/repositories/IBaseRepository'

export class PostgresBaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
  findById(id: string): Promise<T | null> {
    pool.connect()
    pool.query('')
    pool.end()
    throw new Error('Method not implemented.')
  }
  findAll(): Promise<T[]> {
    throw new Error('Method not implemented.')
  }
  create(entity: T): Promise<T> {
    throw new Error('Method not implemented.')
  }
  update(id: string, entity: T): Promise<T> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
