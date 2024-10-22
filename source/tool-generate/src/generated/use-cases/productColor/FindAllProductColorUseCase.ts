import { ViewProductColorDTO } from '../../dtos/ProductColorDTO'
import { IProductColorRepo } from '../../interfaces/repositories/IProductColorRepo'
import { ProductColorMapper } from '../../mappers/ProductColorMapper'

export class FindAllProductColorUseCase {
  readonly #productColorRepo: IProductColorRepo

  constructor(productColorService: IProductColorRepo) {
    this.#productColorRepo = productColorService
  }

  async execute(): Promise<ViewProductColorDTO[]> {
    const productColor = await this.#productColorRepo.findAll()
    return productColor.map((productColor) => ProductColorMapper.toViewProductColorDTO(productColor))
  }
}
