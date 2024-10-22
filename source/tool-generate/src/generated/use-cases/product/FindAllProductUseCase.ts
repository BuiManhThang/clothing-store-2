import { ViewProductDTO } from '../../dtos/ProductDTO'
import { IProductRepo } from '../../interfaces/repositories/IProductRepo'
import { ProductMapper } from '../../mappers/ProductMapper'

export class FindAllProductUseCase {
  readonly #productRepo: IProductRepo

  constructor(productService: IProductRepo) {
    this.#productRepo = productService
  }

  async execute(): Promise<ViewProductDTO[]> {
    const product = await this.#productRepo.findAll()
    return product.map((product) => ProductMapper.toViewProductDTO(product))
  }
}
