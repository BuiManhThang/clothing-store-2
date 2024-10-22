import { Category } from '../../../domain/entities/Category'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateCategoryDTO, ViewCategoryDTO } from '../../dtos/CategoryDTO'
import { ICategoryRepo } from '../../../domain/interfaces/repositories/ICategoryRepo'
import { CategoryMapper } from '../../mappers/CategoryMapper'

export class UpdateCategoryUseCase {
  readonly #categoryRepo: ICategoryRepo

  constructor(categoryRepo: ICategoryRepo) {
    this.#categoryRepo = categoryRepo
  }

  async execute(id: string, updatecategoryDTO: UpdateCategoryDTO): Promise<ViewCategoryDTO | null> {
    const oldCategory = await this.#categoryRepo.findById(id)
    if (!oldCategory) throw new NotFoundError('')

    const category: Category = {
      id: oldCategory.id,
      productCount: updatecategoryDTO.productCount,
      imageId: updatecategoryDTO.imageId,
      status: updatecategoryDTO.status,
      code: updatecategoryDTO.code,
      name: updatecategoryDTO.name,
      description: updatecategoryDTO.description,
      createdAt: oldCategory.createdAt,
      createdBy: oldCategory.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedCategory = await this.#categoryRepo.update(id, category)

    if (updatedCategory) return CategoryMapper.toViewCategoryDTO(updatedCategory)
    return null
  }
}
