import { ViewProductSizeDTO } from '../../dtos/ProductSizeDTO'
import { IProductSizeRepo } from '../../interfaces/repositories/IProductSizeRepo'
import { ProductSizeMapper } from '../../mappers/ProductSizeMapper'

export class FindAllProductSizeUseCase {
  readonly #productSizeRepo: IProductSizeRepo

  constructor(productSizeService: IProductSizeRepo) {
    this.#productSizeRepo = productSizeService
  }

  async execute(): Promise<ViewProductSizeDTO[]> {
    const productSize = await this.#productSizeRepo.findAll()
    return productSize.map((productSize) => ProductSizeMapper.toViewProductSizeDTO(productSize))
  }
}
