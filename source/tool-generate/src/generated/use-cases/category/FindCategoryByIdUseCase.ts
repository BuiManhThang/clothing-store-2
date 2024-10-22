import { ViewCategoryDTO } from '../../dtos/CategoryDTO'
import { ICategoryRepo } from '../../interfaces/repositories/ICategoryRepo'
import { CategoryMapper } from '../../mappers/CategoryMapper'

export class FindCategoryByIdUseCase {
  readonly #categoryRepo: ICategoryRepo

  constructor(categoryRepo: ICategoryRepo) {
    this.#categoryRepo = categoryRepo
  }

  async execute(id: string): Promise<ViewCategoryDTO | null> {
    const category = await this.#categoryRepo.findById(id)
    if (!category) return null
    return CategoryMapper.toViewCategoryDTO(category)
  }
}
