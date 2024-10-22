import { BaseEntity } from '../../domain/entities/BaseEntity'
import { IBaseRepo } from '../../domain/interfaces/repositories/IBaseRepo'
import { IDbConnection } from '../../domain/interfaces/repositories/IDbConnection'
import { DbQueryBuilder, PaginationResult } from '../../shared/types/paginationType'
import { generateUUID } from '../../shared/utils/commonUtil'
import { IBaseCurdService } from '../interfaces/services/IBaseCurdService'

export class BaseCurdService<T extends BaseEntity> implements IBaseCurdService<T> {
  readonly #repo: IBaseRepo<T>

  constructor(repo: IBaseRepo<T>) {
    this.#repo = repo
  }

  findById(id: string, dbConnection?: IDbConnection): Promise<T | null> {
    return this.#repo.findById(id, dbConnection)
  }

  findAll(dbConnection?: IDbConnection): Promise<T[]> {
    return this.#repo.findAll(dbConnection)
  }

  getPagination(
    dbQueryBuilder: DbQueryBuilder<T>,
    dbConnection?: IDbConnection
  ): Promise<PaginationResult<T>> {
    return this.#repo.getPagination(dbQueryBuilder, dbConnection)
  }

  getEntity(dbQueryBuilder: DbQueryBuilder<T>, dbConnection?: IDbConnection): Promise<T | null> {
    return this.#repo.getEntity(dbQueryBuilder, dbConnection)
  }

  getEntities(dbQueryBuilder: DbQueryBuilder<T>, dbConnection?: IDbConnection): Promise<T[]> {
    return this.#repo.getEntities(dbQueryBuilder, dbConnection)
  }

  create(entity: Partial<T>, createdBy: string, dbConnection?: IDbConnection): Promise<T> {
    entity.id = generateUUID()
    entity.createdAt = new Date()
    entity.createdBy = createdBy
    return this.#repo.create(entity, dbConnection)
  }

  update(
    id: string,
    entity: Partial<T>,
    modifiedBy: string,
    dbConnection?: IDbConnection
  ): Promise<T | null> {
    entity.modifiedAt = new Date()
    entity.modifiedBy = modifiedBy
    return this.#repo.update(id, entity, dbConnection)
  }

  delete(id: string, dbConnection?: IDbConnection): Promise<boolean> {
    return this.#repo.delete(id, dbConnection)
  }
}
