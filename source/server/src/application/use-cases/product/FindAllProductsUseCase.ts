import { ViewProductDTO } from '../../dtos/ProductDTO'
import { IProductRepo } from '../../../domain/interfaces/repositories/IProductRepo'
import { ProductMapper } from '../../mappers/ProductMapper'

export class FindAllProductsUseCase {
  readonly #productRepo: IProductRepo

  constructor(productService: IProductRepo) {
    this.#productRepo = productService
  }

  async execute(): Promise<ViewProductDTO[]> {
    const products = await this.#productRepo.findAll()
    return products.map((product) => ProductMapper.toViewProductDTO(product))
  }
}
