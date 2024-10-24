import { ProductColorDtoView } from '../../dtos/ProductColorDto'
import { IProductColorRepo } from '../../../domain/interfaces/repositories/IProductColorRepo'
import { ProductColorMapper } from '../../mappers/ProductColorMapper'

export class FindAllProductColorsUseCase {
  readonly #productColorRepo: IProductColorRepo

  constructor(productColorService: IProductColorRepo) {
    this.#productColorRepo = productColorService
  }

  async execute(): Promise<ProductColorDtoView[]> {
    const productColors = await this.#productColorRepo.findAll()
    return productColors.map((productColor) => ProductColorMapper.toProductColorDtoView(productColor))
  }
}
