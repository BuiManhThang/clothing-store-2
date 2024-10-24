import { ProductSize } from '../../domain/entities/ProductSize'
import { ProductSizeDtoView } from '../dtos/ProductSizeDto'

export class ProductSizeMapper {
  static toProductSizeDtoView(productSize: ProductSize): ProductSizeDtoView {
    return productSize
  }
}
