import { Category } from '../../../domain/entities/Category'
import { CategoryDtoCreate, CategoryDtoView } from '../../dtos/CategoryDto'
import { ICategoryRepo } from '../../../domain/interfaces/repositories/ICategoryRepo'
import { CategoryMapper } from '../../mappers/CategoryMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateCategoryUseCase {
  readonly #categoryRepo: ICategoryRepo

  constructor(categoryRepo: ICategoryRepo) {
    this.#categoryRepo = categoryRepo
  }

  async execute(userContextService: IUserContextService | undefined, createCategoryDto: CategoryDtoCreate): Promise<CategoryDtoView> {
    const category: Category = {
      id: generateUUID(),
      productCount: createCategoryDto.productCount,
      imageId: createCategoryDto.imageId,
      status: createCategoryDto.status,
      code: createCategoryDto.code,
      name: createCategoryDto.name,
      description: createCategoryDto.description,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newCategory = await this.#categoryRepo.create(category)

    return CategoryMapper.toCategoryDtoView(newCategory)
  }
}
