import { ViewProductSizeDTO } from '../../dtos/ProductSizeDTO'
import { IProductSizeRepo } from '../../../domain/interfaces/repositories/IProductSizeRepo'
import { ProductSizeMapper } from '../../mappers/ProductSizeMapper'

export class FindAllProductSizesUseCase {
  readonly #productSizeRepo: IProductSizeRepo

  constructor(productSizeService: IProductSizeRepo) {
    this.#productSizeRepo = productSizeService
  }

  async execute(): Promise<ViewProductSizeDTO[]> {
    const productSizes = await this.#productSizeRepo.findAll()
    return productSizes.map((productSize) => ProductSizeMapper.toViewProductSizeDTO(productSize))
  }
}
