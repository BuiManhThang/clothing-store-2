import { ProductImage } from '../../domain/entities/ProductImage'
import { ProductImageDtoView } from '../dtos/ProductImageDto'

export class ProductImageMapper {
  static toProductImageDtoView(productImage: ProductImage): ProductImageDtoView {
    return productImage
  }
}
