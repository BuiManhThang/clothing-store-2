import { ProductSizeDtoView } from '../../dtos/ProductSizeDto'
import { IProductSizeRepo } from '../../../domain/interfaces/repositories/IProductSizeRepo'
import { ProductSizeMapper } from '../../mappers/ProductSizeMapper'

export class FindProductSizeByIdUseCase {
  readonly #productSizeRepo: IProductSizeRepo

  constructor(productSizeRepo: IProductSizeRepo) {
    this.#productSizeRepo = productSizeRepo
  }

  async execute(id: string): Promise<ProductSizeDtoView | null> {
    const productSize = await this.#productSizeRepo.findById(id)
    if (!productSize) return null
    return ProductSizeMapper.toProductSizeDtoView(productSize)
  }
}
