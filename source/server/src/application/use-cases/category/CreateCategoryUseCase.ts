import { Category } from '../../../domain/entities/Category'
import { CreateCategoryDTO, ViewCategoryDTO } from '../../dtos/CategoryDTO'
import { ICategoryRepo } from '../../../domain/interfaces/repositories/ICategoryRepo'
import { CategoryMapper } from '../../mappers/CategoryMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateCategoryUseCase {
  readonly #categoryRepo: ICategoryRepo

  constructor(categoryRepo: ICategoryRepo) {
    this.#categoryRepo = categoryRepo
  }

  async execute(createCategoryDto: CreateCategoryDTO): Promise<ViewCategoryDTO> {
    const category: Category = {
      id: generateUUID(),
      productCount: createCategoryDto.productCount,
      imageId: createCategoryDto.imageId,
      status: createCategoryDto.status,
      code: createCategoryDto.code,
      name: createCategoryDto.name,
      description: createCategoryDto.description,
      createdAt: new Date(),
      createdBy: '',
    }

    const newCategory = await this.#categoryRepo.create(category)

    return CategoryMapper.toViewCategoryDTO(newCategory)
  }
}
