import { ViewProductInventoryDTO } from '../../dtos/ProductInventoryDTO'
import { IProductInventoryRepo } from '../../interfaces/repositories/IProductInventoryRepo'
import { ProductInventoryMapper } from '../../mappers/ProductInventoryMapper'

export class FindProductInventoryByIdUseCase {
  readonly #productInventoryRepo: IProductInventoryRepo

  constructor(productInventoryRepo: IProductInventoryRepo) {
    this.#productInventoryRepo = productInventoryRepo
  }

  async execute(id: string): Promise<ViewProductInventoryDTO | null> {
    const productInventory = await this.#productInventoryRepo.findById(id)
    if (!productInventory) return null
    return ProductInventoryMapper.toViewProductInventoryDTO(productInventory)
  }
}
