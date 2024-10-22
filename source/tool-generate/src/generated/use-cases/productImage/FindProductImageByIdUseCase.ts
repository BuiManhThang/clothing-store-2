import { ViewProductImageDTO } from '../../dtos/ProductImageDTO'
import { IProductImageRepo } from '../../interfaces/repositories/IProductImageRepo'
import { ProductImageMapper } from '../../mappers/ProductImageMapper'

export class FindProductImageByIdUseCase {
  readonly #productImageRepo: IProductImageRepo

  constructor(productImageRepo: IProductImageRepo) {
    this.#productImageRepo = productImageRepo
  }

  async execute(id: string): Promise<ViewProductImageDTO | null> {
    const productImage = await this.#productImageRepo.findById(id)
    if (!productImage) return null
    return ProductImageMapper.toViewProductImageDTO(productImage)
  }
}
