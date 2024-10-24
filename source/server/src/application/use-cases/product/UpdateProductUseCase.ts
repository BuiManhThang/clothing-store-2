import { Product } from '../../../domain/entities/Product'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { ProductDtoUpdate, ProductDtoView } from '../../dtos/ProductDto'
import { IProductRepo } from '../../../domain/interfaces/repositories/IProductRepo'
import { ProductMapper } from '../../mappers/ProductMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateProductUseCase {
  readonly #productRepo: IProductRepo

  constructor(productRepo: IProductRepo) {
    this.#productRepo = productRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updateproductDto: ProductDtoUpdate): Promise<ProductDtoView | null> {
    const oldProduct = await this.#productRepo.findById(id)
    if (!oldProduct) throw new NotFoundError('')

    const product: Product = {
      id: oldProduct.id,
      categoryId: updateproductDto.categoryId,
      avatarId: updateproductDto.avatarId,
      code: updateproductDto.code,
      name: updateproductDto.name,
      description: updateproductDto.description,
      status: updateproductDto.status,
      createdAt: oldProduct.createdAt,
      createdBy: oldProduct.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedProduct = await this.#productRepo.update(id, product)

    if (updatedProduct) return ProductMapper.toProductDtoView(updatedProduct)
    return null
  }
}
