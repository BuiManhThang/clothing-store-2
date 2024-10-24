import { Category } from '../../domain/entities/Category'
import { CategoryDtoView } from '../dtos/CategoryDto'

export class CategoryMapper {
  static toCategoryDtoView(category: Category): CategoryDtoView {
    return category
  }
}
