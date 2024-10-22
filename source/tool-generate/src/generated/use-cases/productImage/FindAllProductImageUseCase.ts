import { ViewProductImageDTO } from '../../dtos/ProductImageDTO'
import { IProductImageRepo } from '../../interfaces/repositories/IProductImageRepo'
import { ProductImageMapper } from '../../mappers/ProductImageMapper'

export class FindAllProductImageUseCase {
  readonly #productImageRepo: IProductImageRepo

  constructor(productImageService: IProductImageRepo) {
    this.#productImageRepo = productImageService
  }

  async execute(): Promise<ViewProductImageDTO[]> {
    const productImage = await this.#productImageRepo.findAll()
    return productImage.map((productImage) => ProductImageMapper.toViewProductImageDTO(productImage))
  }
}
