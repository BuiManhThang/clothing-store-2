import { ViewProductDTO } from '../../dtos/ProductDTO'
import { IProductRepo } from '../../../domain/interfaces/repositories/IProductRepo'
import { ProductMapper } from '../../mappers/ProductMapper'

export class FindProductByIdUseCase {
  readonly #productRepo: IProductRepo

  constructor(productRepo: IProductRepo) {
    this.#productRepo = productRepo
  }

  async execute(id: string): Promise<ViewProductDTO | null> {
    const product = await this.#productRepo.findById(id)
    if (!product) return null
    return ProductMapper.toViewProductDTO(product)
  }
}
