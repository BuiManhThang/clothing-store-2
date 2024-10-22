import { ICategoryRepo } from '../../application/interfaces/repositories/ICategoryRepo'
import { Category } from '../../domain/entities/Category'
import { BasePostgresRepo } from './BasePostgresRepo'

export class CategoryPostgresRepo extends BasePostgresRepo<Category> implements ICategoryRepo {
  constructor() {
    super('categories')
  }
}
