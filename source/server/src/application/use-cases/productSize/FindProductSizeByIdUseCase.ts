import { ViewProductSizeDTO } from '../../dtos/ProductSizeDTO'
import { IProductSizeRepo } from '../../../domain/interfaces/repositories/IProductSizeRepo'
import { ProductSizeMapper } from '../../mappers/ProductSizeMapper'

export class FindProductSizeByIdUseCase {
  readonly #productSizeRepo: IProductSizeRepo

  constructor(productSizeRepo: IProductSizeRepo) {
    this.#productSizeRepo = productSizeRepo
  }

  async execute(id: string): Promise<ViewProductSizeDTO | null> {
    const productSize = await this.#productSizeRepo.findById(id)
    if (!productSize) return null
    return ProductSizeMapper.toViewProductSizeDTO(productSize)
  }
}
