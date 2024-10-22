import { ProductInventory } from '../../domain/entities/ProductInventory'
import { ViewProductInventoryDTO } from '../dtos/ProductInventoryDTO'

export class ProductInventoryMapper {
  static toViewProductInventoryDTO(productInventory: ProductInventory): ViewProductInventoryDTO {
    return productInventory
  }
}
