import { IDbConnection } from '../../../domain/interfaces/repositories/IDbConnection'
import { DbQueryBuilder, PaginationResult } from '../../../shared/types/paginationType'

export interface IBaseCurdService<T> {
  findById(id: string, dbConnection?: IDbConnection): Promise<T | null>
  findAll(dbConnection?: IDbConnection): Promise<T[]>
  getPagination(
    dbQueryBuilder: DbQueryBuilder<T>,
    dbConnection?: IDbConnection
  ): Promise<PaginationResult<T>>
  getEntity(dbQueryBuilder: DbQueryBuilder<T>, dbConnection?: IDbConnection): Promise<T | null>
  getEntities(dbQueryBuilder: DbQueryBuilder<T>, dbConnection?: IDbConnection): Promise<T[]>
  create(entity: Partial<T>, createdBy: string, dbConnection?: IDbConnection): Promise<T>
  update(
    id: string,
    entity: Partial<T>,
    modifiedBy: string,
    dbConnection?: IDbConnection
  ): Promise<T | null>
  delete(id: string, dbConnection?: IDbConnection): Promise<boolean>
}
