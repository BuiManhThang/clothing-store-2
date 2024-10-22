import { Category } from '../../domain/entities/Category'
import { ViewCategoryDTO } from '../dtos/CategoryDTO'

export class CategoryMapper {
  static toViewCategoryDTO(category: Category): ViewCategoryDTO {
    return category
  }
}
