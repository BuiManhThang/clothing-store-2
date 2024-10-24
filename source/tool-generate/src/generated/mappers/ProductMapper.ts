import { Product } from '../../domain/entities/Product'
import { ProductDtoView } from '../dtos/ProductDto'

export class ProductMapper {
  static toProductDtoView(product: Product): ProductDtoView {
    return product
  }
}
