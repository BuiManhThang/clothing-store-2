import { ProductColor } from '../../domain/entities/ProductColor'
import { ViewProductColorDTO } from '../dtos/ProductColorDTO'

export class ProductColorMapper {
  static toViewProductColorDTO(productColor: ProductColor): ViewProductColorDTO {
    return productColor
  }
}
