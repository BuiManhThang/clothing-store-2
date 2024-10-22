import { IProductImageRepo } from '../../application/interfaces/repositories/IProductImageRepo'
import { ProductImage } from '../../domain/entities/ProductImage'
import { BasePostgresRepo } from './BasePostgresRepo'

export class ProductImagePostgresRepo extends BasePostgresRepo<ProductImage> implements IProductImageRepo {
  constructor() {
    super('productImages')
  }
}
