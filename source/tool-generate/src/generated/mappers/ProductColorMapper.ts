import { ProductColor } from '../../domain/entities/ProductColor'
import { ProductColorDtoView } from '../dtos/ProductColorDto'

export class ProductColorMapper {
  static toProductColorDtoView(productColor: ProductColor): ProductColorDtoView {
    return productColor
  }
}
