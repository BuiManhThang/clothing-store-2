import { ProductSize } from '../../../domain/entities/ProductSize'
import { ProductSizeDtoCreate, ProductSizeDtoView } from '../../dtos/ProductSizeDto'
import { IProductSizeRepo } from '../../../domain/interfaces/repositories/IProductSizeRepo'
import { ProductSizeMapper } from '../../mappers/ProductSizeMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateProductSizeUseCase {
  readonly #productSizeRepo: IProductSizeRepo

  constructor(productSizeRepo: IProductSizeRepo) {
    this.#productSizeRepo = productSizeRepo
  }

  async execute(userContextService: IUserContextService | undefined, createProductSizeDto: ProductSizeDtoCreate): Promise<ProductSizeDtoView> {
    const productSize: ProductSize = {
      id: generateUUID(),
      productId: createProductSizeDto.productId,
      order: createProductSizeDto.order,
      name: createProductSizeDto.name,
      description: createProductSizeDto.description,
      status: createProductSizeDto.status,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newProductSize = await this.#productSizeRepo.create(productSize)

    return ProductSizeMapper.toProductSizeDtoView(newProductSize)
  }
}
