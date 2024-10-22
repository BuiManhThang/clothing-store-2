import { ViewProductColorDTO } from '../../dtos/ProductColorDTO'
import { IProductColorRepo } from '../../../domain/interfaces/repositories/IProductColorRepo'
import { ProductColorMapper } from '../../mappers/ProductColorMapper'

export class FindProductColorByIdUseCase {
  readonly #productColorRepo: IProductColorRepo

  constructor(productColorRepo: IProductColorRepo) {
    this.#productColorRepo = productColorRepo
  }

  async execute(id: string): Promise<ViewProductColorDTO | null> {
    const productColor = await this.#productColorRepo.findById(id)
    if (!productColor) return null
    return ProductColorMapper.toViewProductColorDTO(productColor)
  }
}
