import { Category } from '../../../domain/entities/Category'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { CategoryDtoUpdate, CategoryDtoView } from '../../dtos/CategoryDto'
import { ICategoryRepo } from '../../../domain/interfaces/repositories/ICategoryRepo'
import { CategoryMapper } from '../../mappers/CategoryMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateCategoryUseCase {
  readonly #categoryRepo: ICategoryRepo

  constructor(categoryRepo: ICategoryRepo) {
    this.#categoryRepo = categoryRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updatecategoryDto: CategoryDtoUpdate): Promise<CategoryDtoView | null> {
    const oldCategory = await this.#categoryRepo.findById(id)
    if (!oldCategory) throw new NotFoundError('')

    const category: Category = {
      id: oldCategory.id,
      productCount: updatecategoryDto.productCount,
      imageId: updatecategoryDto.imageId,
      status: updatecategoryDto.status,
      code: updatecategoryDto.code,
      name: updatecategoryDto.name,
      description: updatecategoryDto.description,
      createdAt: oldCategory.createdAt,
      createdBy: oldCategory.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedCategory = await this.#categoryRepo.update(id, category)

    if (updatedCategory) return CategoryMapper.toCategoryDtoView(updatedCategory)
    return null
  }
}
