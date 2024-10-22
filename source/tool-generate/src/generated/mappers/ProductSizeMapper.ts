import { ProductSize } from '../../domain/entities/ProductSize'
import { ViewProductSizeDTO } from '../dtos/ProductSizeDTO'

export class ProductSizeMapper {
  static toViewProductSizeDTO(productSize: ProductSize): ViewProductSizeDTO {
    return productSize
  }
}
