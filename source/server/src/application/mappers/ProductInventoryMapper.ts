import { ProductInventory } from '../../domain/entities/ProductInventory'
import { ProductInventoryDtoView } from '../dtos/ProductInventoryDto'

export class ProductInventoryMapper {
  static toProductInventoryDtoView(productInventory: ProductInventory): ProductInventoryDtoView {
    return productInventory
  }
}
