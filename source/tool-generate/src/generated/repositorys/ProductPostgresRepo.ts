import { IProductRepo } from '../../application/interfaces/repositories/IProductRepo'
import { Product } from '../../domain/entities/Product'
import { BasePostgresRepo } from './BasePostgresRepo'

export class ProductPostgresRepo extends BasePostgresRepo<Product> implements IProductRepo {
  constructor() {
    super('products')
  }
}
