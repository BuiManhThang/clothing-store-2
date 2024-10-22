import { IProductInventoryRepo } from '../../domain/interfaces/repositories/IProductInventoryRepo'
import { ProductInventory } from '../../domain/entities/ProductInventory'
import { BasePostgresRepo } from './BasePostgresRepo'

export class ProductInventoryPostgresRepo
  extends BasePostgresRepo<ProductInventory>
  implements IProductInventoryRepo
{
  constructor() {
    super('productInventory')
  }
}
