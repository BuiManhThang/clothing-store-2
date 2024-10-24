import { ProductInventoryDtoView } from '../../dtos/ProductInventoryDto'
import { IProductInventoryRepo } from '../../../domain/interfaces/repositories/IProductInventoryRepo'
import { ProductInventoryMapper } from '../../mappers/ProductInventoryMapper'

export class FindAllProductInventoryUseCase {
  readonly #productInventoryRepo: IProductInventoryRepo

  constructor(productInventoryService: IProductInventoryRepo) {
    this.#productInventoryRepo = productInventoryService
  }

  async execute(): Promise<ProductInventoryDtoView[]> {
    const productInventory = await this.#productInventoryRepo.findAll()
    return productInventory.map((productInventory) => ProductInventoryMapper.toProductInventoryDtoView(productInventory))
  }
}
