import { ViewProductInventoryDTO } from '../../dtos/ProductInventoryDTO'
import { IProductInventoryRepo } from '../../interfaces/repositories/IProductInventoryRepo'
import { ProductInventoryMapper } from '../../mappers/ProductInventoryMapper'

export class FindAllProductInventoryUseCase {
  readonly #productInventoryRepo: IProductInventoryRepo

  constructor(productInventoryService: IProductInventoryRepo) {
    this.#productInventoryRepo = productInventoryService
  }

  async execute(): Promise<ViewProductInventoryDTO[]> {
    const productInventory = await this.#productInventoryRepo.findAll()
    return productInventory.map((productInventory) => ProductInventoryMapper.toViewProductInventoryDTO(productInventory))
  }
}
