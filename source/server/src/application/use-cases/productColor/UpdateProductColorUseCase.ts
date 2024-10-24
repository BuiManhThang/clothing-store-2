import { ProductColor } from '../../../domain/entities/ProductColor'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { ProductColorDtoUpdate, ProductColorDtoView } from '../../dtos/ProductColorDto'
import { IProductColorRepo } from '../../../domain/interfaces/repositories/IProductColorRepo'
import { ProductColorMapper } from '../../mappers/ProductColorMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateProductColorUseCase {
  readonly #productColorRepo: IProductColorRepo

  constructor(productColorRepo: IProductColorRepo) {
    this.#productColorRepo = productColorRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updateproductColorDto: ProductColorDtoUpdate): Promise<ProductColorDtoView | null> {
    const oldProductColor = await this.#productColorRepo.findById(id)
    if (!oldProductColor) throw new NotFoundError('')

    const productColor: ProductColor = {
      id: oldProductColor.id,
      order: updateproductColorDto.order,
      productId: updateproductColorDto.productId,
      status: updateproductColorDto.status,
      code: updateproductColorDto.code,
      name: updateproductColorDto.name,
      description: updateproductColorDto.description,
      createdAt: oldProductColor.createdAt,
      createdBy: oldProductColor.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedProductColor = await this.#productColorRepo.update(id, productColor)

    if (updatedProductColor) return ProductColorMapper.toProductColorDtoView(updatedProductColor)
    return null
  }
}
