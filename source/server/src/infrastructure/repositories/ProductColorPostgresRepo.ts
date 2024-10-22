import { IProductColorRepo } from '../../domain/interfaces/repositories/IProductColorRepo'
import { ProductColor } from '../../domain/entities/ProductColor'
import { BasePostgresRepo } from './BasePostgresRepo'

export class ProductColorPostgresRepo
  extends BasePostgresRepo<ProductColor>
  implements IProductColorRepo
{
  constructor() {
    super('productColors')
  }
}
