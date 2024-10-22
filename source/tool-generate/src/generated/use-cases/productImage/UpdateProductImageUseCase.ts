import { ProductImage } from '../../../domain/entities/ProductImage'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateProductImageDTO, ViewProductImageDTO } from '../../dtos/ProductImageDTO'
import { IProductImageRepo } from '../../interfaces/repositories/IProductImageRepo'
import { ProductImageMapper } from '../../mappers/ProductImageMapper'

export class UpdateProductImageUseCase {
  readonly #productImageRepo: IProductImageRepo

  constructor(productImageRepo: IProductImageRepo) {
    this.#productImageRepo = productImageRepo
  }

  async execute(id: string, updateproductImageDTO: UpdateProductImageDTO): Promise<ViewProductImageDTO | null> {
    const oldProductImage = await this.#productImageRepo.findById(id)
    if (!oldProductImage) throw new NotFoundError('')

    const productImage: ProductImage = {
      id: oldProductImage.id,
      productId: updateproductImageDTO.productId,
      imageId: updateproductImageDTO.imageId,
      description: updateproductImageDTO.description,
      createdAt: oldProductImage.createdAt,
      createdBy: oldProductImage.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedProductImage = await this.#productImageRepo.update(id, productImage)

    if (updatedProductImage) return ProductImageMapper.toViewProductImageDTO(updatedProductImage)
    return null
  }
}
