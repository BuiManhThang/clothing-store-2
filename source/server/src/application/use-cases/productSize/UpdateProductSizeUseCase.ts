import { ProductSize } from '../../../domain/entities/ProductSize'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateProductSizeDTO, ViewProductSizeDTO } from '../../dtos/ProductSizeDTO'
import { IProductSizeRepo } from '../../../domain/interfaces/repositories/IProductSizeRepo'
import { ProductSizeMapper } from '../../mappers/ProductSizeMapper'

export class UpdateProductSizeUseCase {
  readonly #productSizeRepo: IProductSizeRepo

  constructor(productSizeRepo: IProductSizeRepo) {
    this.#productSizeRepo = productSizeRepo
  }

  async execute(
    id: string,
    updateproductSizeDTO: UpdateProductSizeDTO
  ): Promise<ViewProductSizeDTO | null> {
    const oldProductSize = await this.#productSizeRepo.findById(id)
    if (!oldProductSize) throw new NotFoundError('')

    const productSize: ProductSize = {
      id: oldProductSize.id,
      productId: updateproductSizeDTO.productId,
      order: updateproductSizeDTO.order,
      name: updateproductSizeDTO.name,
      description: updateproductSizeDTO.description,
      status: updateproductSizeDTO.status,
      createdAt: oldProductSize.createdAt,
      createdBy: oldProductSize.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedProductSize = await this.#productSizeRepo.update(id, productSize)

    if (updatedProductSize) return ProductSizeMapper.toViewProductSizeDTO(updatedProductSize)
    return null
  }
}
