import { ProductInventor } from '../../../domain/entities/ProductInventor'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateProductInventorDTO, ViewProductInventorDTO } from '../../dtos/ProductInventorDTO'
import { IProductInventorRepo } from '../../../domain/interfaces/repositories/IProductInventorRepo'
import { ProductInventorMapper } from '../../mappers/ProductInventorMapper'

export class UpdateProductInventorUseCase {
  readonly #productInventorRepo: IProductInventorRepo

  constructor(productInventorRepo: IProductInventorRepo) {
    this.#productInventorRepo = productInventorRepo
  }

  async execute(
    id: string,
    updateproductInventorDTO: UpdateProductInventorDTO
  ): Promise<ViewProductInventorDTO | null> {
    const oldProductInventor = await this.#productInventorRepo.findById(id)
    if (!oldProductInventor) throw new NotFoundError('')

    const productInventor: ProductInventor = {
      id: oldProductInventor.id,
      productId: updateproductInventorDTO.productId,
      colorId: updateproductInventorDTO.colorId,
      sizeId: updateproductInventorDTO.sizeId,
      quantity: updateproductInventorDTO.quantity,
      createdAt: oldProductInventor.createdAt,
      createdBy: oldProductInventor.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedProductInventor = await this.#productInventorRepo.update(id, productInventor)

    if (updatedProductInventor)
      return ProductInventorMapper.toViewProductInventorDTO(updatedProductInventor)
    return null
  }
}
