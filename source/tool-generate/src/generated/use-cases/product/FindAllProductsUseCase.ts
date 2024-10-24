import { ProductDtoView } from '../../dtos/ProductDto'
import { IProductRepo } from '../../../domain/interfaces/repositories/IProductRepo'
import { ProductMapper } from '../../mappers/ProductMapper'

export class FindAllProductsUseCase {
  readonly #productRepo: IProductRepo

  constructor(productService: IProductRepo) {
    this.#productRepo = productService
  }

  async execute(): Promise<ProductDtoView[]> {
    const products = await this.#productRepo.findAll()
    return products.map((product) => ProductMapper.toProductDtoView(product))
  }
}
