import { CategoryDtoView } from '../../dtos/CategoryDto'
import { ICategoryRepo } from '../../../domain/interfaces/repositories/ICategoryRepo'
import { CategoryMapper } from '../../mappers/CategoryMapper'

export class FindCategoryByIdUseCase {
  readonly #categoryRepo: ICategoryRepo

  constructor(categoryRepo: ICategoryRepo) {
    this.#categoryRepo = categoryRepo
  }

  async execute(id: string): Promise<CategoryDtoView | null> {
    const category = await this.#categoryRepo.findById(id)
    if (!category) return null
    return CategoryMapper.toCategoryDtoView(category)
  }
}
