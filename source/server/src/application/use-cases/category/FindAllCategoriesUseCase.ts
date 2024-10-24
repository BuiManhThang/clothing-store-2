import { CategoryDtoView } from '../../dtos/CategoryDto'
import { ICategoryRepo } from '../../../domain/interfaces/repositories/ICategoryRepo'
import { CategoryMapper } from '../../mappers/CategoryMapper'

export class FindAllCategoriesUseCase {
  readonly #categoryRepo: ICategoryRepo

  constructor(categoryService: ICategoryRepo) {
    this.#categoryRepo = categoryService
  }

  async execute(): Promise<CategoryDtoView[]> {
    const categories = await this.#categoryRepo.findAll()
    return categories.map((category) => CategoryMapper.toCategoryDtoView(category))
  }
}
