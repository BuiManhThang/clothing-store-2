import { ProductImageDtoView } from '../../dtos/ProductImageDto'
import { IProductImageRepo } from '../../../domain/interfaces/repositories/IProductImageRepo'
import { ProductImageMapper } from '../../mappers/ProductImageMapper'

export class FindAllProductImagesUseCase {
  readonly #productImageRepo: IProductImageRepo

  constructor(productImageService: IProductImageRepo) {
    this.#productImageRepo = productImageService
  }

  async execute(): Promise<ProductImageDtoView[]> {
    const productImages = await this.#productImageRepo.findAll()
    return productImages.map((productImage) => ProductImageMapper.toProductImageDtoView(productImage))
  }
}
