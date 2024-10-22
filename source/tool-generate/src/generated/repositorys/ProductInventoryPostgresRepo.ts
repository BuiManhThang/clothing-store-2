import { IProductInventoryRepo } from '../../application/interfaces/repositories/IProductInventoryRepo'
import { ProductInventory } from '../../domain/entities/ProductInventory'
import { BasePostgresRepo } from './BasePostgresRepo'

export class ProductInventoryPostgresRepo extends BasePostgresRepo<ProductInventory> implements IProductInventoryRepo {
  constructor() {
    super('productInventory')
  }
}
