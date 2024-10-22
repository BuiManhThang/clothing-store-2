import { ProductInventor } from '../../../domain/entities/ProductInventor'
import { CreateProductInventorDTO, ViewProductInventorDTO } from '../../dtos/ProductInventorDTO'
import { IProductInventorRepo } from '../../../domain/interfaces/repositories/IProductInventorRepo'
import { ProductInventorMapper } from '../../mappers/ProductInventorMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateProductInventorUseCase {
  readonly #productInventorRepo: IProductInventorRepo

  constructor(productInventorRepo: IProductInventorRepo) {
    this.#productInventorRepo = productInventorRepo
  }

  async execute(
    createProductInventorDto: CreateProductInventorDTO
  ): Promise<ViewProductInventorDTO> {
    const productInventor: ProductInventor = {
      id: generateUUID(),
      productId: createProductInventorDto.productId,
      colorId: createProductInventorDto.colorId,
      sizeId: createProductInventorDto.sizeId,
      quantity: createProductInventorDto.quantity,
      createdAt: new Date(),
      createdBy: '',
    }

    const newProductInventor = await this.#productInventorRepo.create(productInventor)

    return ProductInventorMapper.toViewProductInventorDTO(newProductInventor)
  }
}
