import { ProductInventory } from '../../../domain/entities/ProductInventory'
import { CreateProductInventoryDTO, ViewProductInventoryDTO } from '../../dtos/ProductInventoryDTO'
import { IProductInventoryRepo } from '../../../domain/interfaces/repositories/IProductInventoryRepo'
import { ProductInventoryMapper } from '../../mappers/ProductInventoryMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateProductInventoryUseCase {
  readonly #productInventoryRepo: IProductInventoryRepo

  constructor(productInventoryRepo: IProductInventoryRepo) {
    this.#productInventoryRepo = productInventoryRepo
  }

  async execute(
    createProductInventoryDto: CreateProductInventoryDTO
  ): Promise<ViewProductInventoryDTO> {
    const productInventory: ProductInventory = {
      id: generateUUID(),
      productId: createProductInventoryDto.productId,
      colorId: createProductInventoryDto.colorId,
      sizeId: createProductInventoryDto.sizeId,
      quantity: createProductInventoryDto.quantity,
      createdAt: new Date(),
      createdBy: '',
    }

    const newProductInventory = await this.#productInventoryRepo.create(productInventory)

    return ProductInventoryMapper.toViewProductInventoryDTO(newProductInventory)
  }
}
