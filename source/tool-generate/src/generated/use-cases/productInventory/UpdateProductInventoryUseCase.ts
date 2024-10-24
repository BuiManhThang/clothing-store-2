import { ProductInventory } from '../../../domain/entities/ProductInventory'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { ProductInventoryDtoUpdate, ProductInventoryDtoView } from '../../dtos/ProductInventoryDto'
import { IProductInventoryRepo } from '../../../domain/interfaces/repositories/IProductInventoryRepo'
import { ProductInventoryMapper } from '../../mappers/ProductInventoryMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateProductInventoryUseCase {
  readonly #productInventoryRepo: IProductInventoryRepo

  constructor(productInventoryRepo: IProductInventoryRepo) {
    this.#productInventoryRepo = productInventoryRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updateproductInventoryDto: ProductInventoryDtoUpdate): Promise<ProductInventoryDtoView | null> {
    const oldProductInventory = await this.#productInventoryRepo.findById(id)
    if (!oldProductInventory) throw new NotFoundError('')

    const productInventory: ProductInventory = {
      id: oldProductInventory.id,
      productId: updateproductInventoryDto.productId,
      colorId: updateproductInventoryDto.colorId,
      sizeId: updateproductInventoryDto.sizeId,
      quantity: updateproductInventoryDto.quantity,
      createdAt: oldProductInventory.createdAt,
      createdBy: oldProductInventory.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedProductInventory = await this.#productInventoryRepo.update(id, productInventory)

    if (updatedProductInventory) return ProductInventoryMapper.toProductInventoryDtoView(updatedProductInventory)
    return null
  }
}
