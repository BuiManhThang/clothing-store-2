import { ViewCategoryDTO } from '../../dtos/CategoryDTO'
import { ICategoryRepo } from '../../interfaces/repositories/ICategoryRepo'
import { CategoryMapper } from '../../mappers/CategoryMapper'

export class FindAllCategoriesUseCase {
  readonly #categoryRepo: ICategoryRepo

  constructor(categoryService: ICategoryRepo) {
    this.#categoryRepo = categoryService
  }

  async execute(): Promise<ViewCategoryDTO[]> {
    const categories = await this.#categoryRepo.findAll()
    return categories.map((category) => CategoryMapper.toViewCategoryDTO(category))
  }
}
