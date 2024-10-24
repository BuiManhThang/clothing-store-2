import { ProductImageDtoView } from '../../dtos/ProductImageDto'
import { IProductImageRepo } from '../../../domain/interfaces/repositories/IProductImageRepo'
import { ProductImageMapper } from '../../mappers/ProductImageMapper'

export class FindProductImageByIdUseCase {
  readonly #productImageRepo: IProductImageRepo

  constructor(productImageRepo: IProductImageRepo) {
    this.#productImageRepo = productImageRepo
  }

  async execute(id: string): Promise<ProductImageDtoView | null> {
    const productImage = await this.#productImageRepo.findById(id)
    if (!productImage) return null
    return ProductImageMapper.toProductImageDtoView(productImage)
  }
}
