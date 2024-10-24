import { ProductInventoryDtoView } from '../../dtos/ProductInventoryDto'
import { IProductInventoryRepo } from '../../../domain/interfaces/repositories/IProductInventoryRepo'
import { ProductInventoryMapper } from '../../mappers/ProductInventoryMapper'

export class FindProductInventoryByIdUseCase {
  readonly #productInventoryRepo: IProductInventoryRepo

  constructor(productInventoryRepo: IProductInventoryRepo) {
    this.#productInventoryRepo = productInventoryRepo
  }

  async execute(id: string): Promise<ProductInventoryDtoView | null> {
    const productInventory = await this.#productInventoryRepo.findById(id)
    if (!productInventory) return null
    return ProductInventoryMapper.toProductInventoryDtoView(productInventory)
  }
}
