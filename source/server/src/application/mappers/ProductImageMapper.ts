import { ProductImage } from '../../domain/entities/ProductImage'
import { ViewProductImageDTO } from '../dtos/ProductImageDTO'

export class ProductImageMapper {
  static toViewProductImageDTO(productImage: ProductImage): ViewProductImageDTO {
    return productImage
  }
}
