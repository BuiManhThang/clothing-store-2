import { ProductColor } from '../../../domain/entities/ProductColor'
import { ProductColorDtoCreate, ProductColorDtoView } from '../../dtos/ProductColorDto'
import { IProductColorRepo } from '../../../domain/interfaces/repositories/IProductColorRepo'
import { ProductColorMapper } from '../../mappers/ProductColorMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateProductColorUseCase {
  readonly #productColorRepo: IProductColorRepo

  constructor(productColorRepo: IProductColorRepo) {
    this.#productColorRepo = productColorRepo
  }

  async execute(userContextService: IUserContextService | undefined, createProductColorDto: ProductColorDtoCreate): Promise<ProductColorDtoView> {
    const productColor: ProductColor = {
      id: generateUUID(),
      order: createProductColorDto.order,
      productId: createProductColorDto.productId,
      status: createProductColorDto.status,
      code: createProductColorDto.code,
      name: createProductColorDto.name,
      description: createProductColorDto.description,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newProductColor = await this.#productColorRepo.create(productColor)

    return ProductColorMapper.toProductColorDtoView(newProductColor)
  }
}
