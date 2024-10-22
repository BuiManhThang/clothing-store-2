import { ProductInventor } from '../../domain/entities/ProductInventor'
import { ViewProductInventorDTO } from '../dtos/ProductInventorDTO'

export class ProductInventorMapper {
  static toViewProductInventorDTO(productInventor: ProductInventor): ViewProductInventorDTO {
    return productInventor
  }
}
