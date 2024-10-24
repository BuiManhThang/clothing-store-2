import { ProductImage } from '../../../domain/entities/ProductImage'
import { ProductImageDtoCreate, ProductImageDtoView } from '../../dtos/ProductImageDto'
import { IProductImageRepo } from '../../../domain/interfaces/repositories/IProductImageRepo'
import { ProductImageMapper } from '../../mappers/ProductImageMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateProductImageUseCase {
  readonly #productImageRepo: IProductImageRepo

  constructor(productImageRepo: IProductImageRepo) {
    this.#productImageRepo = productImageRepo
  }

  async execute(userContextService: IUserContextService | undefined, createProductImageDto: ProductImageDtoCreate): Promise<ProductImageDtoView> {
    const productImage: ProductImage = {
      id: generateUUID(),
      productId: createProductImageDto.productId,
      imageId: createProductImageDto.imageId,
      description: createProductImageDto.description,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newProductImage = await this.#productImageRepo.create(productImage)

    return ProductImageMapper.toProductImageDtoView(newProductImage)
  }
}
