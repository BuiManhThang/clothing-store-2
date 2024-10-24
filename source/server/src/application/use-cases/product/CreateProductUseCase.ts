import { Product } from '../../../domain/entities/Product'
import { ProductDtoCreate, ProductDtoView } from '../../dtos/ProductDto'
import { IProductRepo } from '../../../domain/interfaces/repositories/IProductRepo'
import { ProductMapper } from '../../mappers/ProductMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateProductUseCase {
  readonly #productRepo: IProductRepo

  constructor(productRepo: IProductRepo) {
    this.#productRepo = productRepo
  }

  async execute(userContextService: IUserContextService | undefined, createProductDto: ProductDtoCreate): Promise<ProductDtoView> {
    const product: Product = {
      id: generateUUID(),
      categoryId: createProductDto.categoryId,
      avatarId: createProductDto.avatarId,
      code: createProductDto.code,
      name: createProductDto.name,
      description: createProductDto.description,
      status: createProductDto.status,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newProduct = await this.#productRepo.create(product)

    return ProductMapper.toProductDtoView(newProduct)
  }
}
