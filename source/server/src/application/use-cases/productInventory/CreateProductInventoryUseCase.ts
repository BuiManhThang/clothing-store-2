import { ProductInventory } from '../../../domain/entities/ProductInventory'
import { ProductInventoryDtoCreate, ProductInventoryDtoView } from '../../dtos/ProductInventoryDto'
import { IProductInventoryRepo } from '../../../domain/interfaces/repositories/IProductInventoryRepo'
import { ProductInventoryMapper } from '../../mappers/ProductInventoryMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateProductInventoryUseCase {
  readonly #productInventoryRepo: IProductInventoryRepo

  constructor(productInventoryRepo: IProductInventoryRepo) {
    this.#productInventoryRepo = productInventoryRepo
  }

  async execute(userContextService: IUserContextService | undefined, createProductInventoryDto: ProductInventoryDtoCreate): Promise<ProductInventoryDtoView> {
    const productInventory: ProductInventory = {
      id: generateUUID(),
      productId: createProductInventoryDto.productId,
      colorId: createProductInventoryDto.colorId,
      sizeId: createProductInventoryDto.sizeId,
      quantity: createProductInventoryDto.quantity,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newProductInventory = await this.#productInventoryRepo.create(productInventory)

    return ProductInventoryMapper.toProductInventoryDtoView(newProductInventory)
  }
}
