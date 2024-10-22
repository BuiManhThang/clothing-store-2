import { IProductSizeRepo } from '../../application/interfaces/repositories/IProductSizeRepo'
import { ProductSize } from '../../domain/entities/ProductSize'
import { BasePostgresRepo } from './BasePostgresRepo'

export class ProductSizePostgresRepo extends BasePostgresRepo<ProductSize> implements IProductSizeRepo {
  constructor() {
    super('productSizes')
  }
}
