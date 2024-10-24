import { ProductImage } from '../../../domain/entities/ProductImage'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { ProductImageDtoUpdate, ProductImageDtoView } from '../../dtos/ProductImageDto'
import { IProductImageRepo } from '../../../domain/interfaces/repositories/IProductImageRepo'
import { ProductImageMapper } from '../../mappers/ProductImageMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateProductImageUseCase {
  readonly #productImageRepo: IProductImageRepo

  constructor(productImageRepo: IProductImageRepo) {
    this.#productImageRepo = productImageRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updateproductImageDto: ProductImageDtoUpdate): Promise<ProductImageDtoView | null> {
    const oldProductImage = await this.#productImageRepo.findById(id)
    if (!oldProductImage) throw new NotFoundError('')

    const productImage: ProductImage = {
      id: oldProductImage.id,
      productId: updateproductImageDto.productId,
      imageId: updateproductImageDto.imageId,
      description: updateproductImageDto.description,
      createdAt: oldProductImage.createdAt,
      createdBy: oldProductImage.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedProductImage = await this.#productImageRepo.update(id, productImage)

    if (updatedProductImage) return ProductImageMapper.toProductImageDtoView(updatedProductImage)
    return null
  }
}
