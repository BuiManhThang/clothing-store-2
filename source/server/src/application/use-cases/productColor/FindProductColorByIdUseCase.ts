import { ProductColorDtoView } from '../../dtos/ProductColorDto'
import { IProductColorRepo } from '../../../domain/interfaces/repositories/IProductColorRepo'
import { ProductColorMapper } from '../../mappers/ProductColorMapper'

export class FindProductColorByIdUseCase {
  readonly #productColorRepo: IProductColorRepo

  constructor(productColorRepo: IProductColorRepo) {
    this.#productColorRepo = productColorRepo
  }

  async execute(id: string): Promise<ProductColorDtoView | null> {
    const productColor = await this.#productColorRepo.findById(id)
    if (!productColor) return null
    return ProductColorMapper.toProductColorDtoView(productColor)
  }
}
