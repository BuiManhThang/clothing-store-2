import { ProductSizeDtoView } from '../../dtos/ProductSizeDto'
import { IProductSizeRepo } from '../../../domain/interfaces/repositories/IProductSizeRepo'
import { ProductSizeMapper } from '../../mappers/ProductSizeMapper'

export class FindAllProductSizesUseCase {
  readonly #productSizeRepo: IProductSizeRepo

  constructor(productSizeService: IProductSizeRepo) {
    this.#productSizeRepo = productSizeService
  }

  async execute(): Promise<ProductSizeDtoView[]> {
    const productSizes = await this.#productSizeRepo.findAll()
    return productSizes.map((productSize) => ProductSizeMapper.toProductSizeDtoView(productSize))
  }
}
