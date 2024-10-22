import { Product } from '../../domain/entities/Product'
import { ViewProductDTO } from '../dtos/ProductDTO'

export class ProductMapper {
  static toViewProductDTO(product: Product): ViewProductDTO {
    return product
  }
}
