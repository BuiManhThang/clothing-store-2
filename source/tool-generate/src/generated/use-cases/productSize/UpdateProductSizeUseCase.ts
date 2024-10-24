import { ProductSize } from '../../../domain/entities/ProductSize'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { ProductSizeDtoUpdate, ProductSizeDtoView } from '../../dtos/ProductSizeDto'
import { IProductSizeRepo } from '../../../domain/interfaces/repositories/IProductSizeRepo'
import { ProductSizeMapper } from '../../mappers/ProductSizeMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateProductSizeUseCase {
  readonly #productSizeRepo: IProductSizeRepo

  constructor(productSizeRepo: IProductSizeRepo) {
    this.#productSizeRepo = productSizeRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updateproductSizeDto: ProductSizeDtoUpdate): Promise<ProductSizeDtoView | null> {
    const oldProductSize = await this.#productSizeRepo.findById(id)
    if (!oldProductSize) throw new NotFoundError('')

    const productSize: ProductSize = {
      id: oldProductSize.id,
      productId: updateproductSizeDto.productId,
      order: updateproductSizeDto.order,
      name: updateproductSizeDto.name,
      description: updateproductSizeDto.description,
      status: updateproductSizeDto.status,
      createdAt: oldProductSize.createdAt,
      createdBy: oldProductSize.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedProductSize = await this.#productSizeRepo.update(id, productSize)

    if (updatedProductSize) return ProductSizeMapper.toProductSizeDtoView(updatedProductSize)
    return null
  }
}
