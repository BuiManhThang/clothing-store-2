import { ProductInventory } from '../../../domain/entities/ProductInventory'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateProductInventoryDTO, ViewProductInventoryDTO } from '../../dtos/ProductInventoryDTO'
import { IProductInventoryRepo } from '../../../domain/interfaces/repositories/IProductInventoryRepo'
import { ProductInventoryMapper } from '../../mappers/ProductInventoryMapper'

export class UpdateProductInventoryUseCase {
  readonly #productInventoryRepo: IProductInventoryRepo

  constructor(productInventoryRepo: IProductInventoryRepo) {
    this.#productInventoryRepo = productInventoryRepo
  }

  async execute(
    id: string,
    updateproductInventoryDTO: UpdateProductInventoryDTO
  ): Promise<ViewProductInventoryDTO | null> {
    const oldProductInventory = await this.#productInventoryRepo.findById(id)
    if (!oldProductInventory) throw new NotFoundError('')

    const productInventory: ProductInventory = {
      id: oldProductInventory.id,
      productId: updateproductInventoryDTO.productId,
      colorId: updateproductInventoryDTO.colorId,
      sizeId: updateproductInventoryDTO.sizeId,
      quantity: updateproductInventoryDTO.quantity,
      createdAt: oldProductInventory.createdAt,
      createdBy: oldProductInventory.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedProductInventory = await this.#productInventoryRepo.update(id, productInventory)

    if (updatedProductInventory)
      return ProductInventoryMapper.toViewProductInventoryDTO(updatedProductInventory)
    return null
  }
}
