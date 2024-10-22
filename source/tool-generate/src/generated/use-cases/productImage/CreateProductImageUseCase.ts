import { ProductImage } from '../../../domain/entities/ProductImage'
import { CreateProductImageDTO, ViewProductImageDTO } from '../../dtos/ProductImageDTO'
import { IProductImageRepo } from '../../interfaces/repositories/IProductImageRepo'
import { ProductImageMapper } from '../../mappers/ProductImageMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateProductImageUseCase {
  readonly #productImageRepo: IProductImageRepo

  constructor(productImageRepo: IProductImageRepo) {
    this.#productImageRepo = productImageRepo
  }

  async execute(createProductImageDto: CreateProductImageDTO): Promise<ViewProductImageDTO> {
    const productImage: ProductImage = {
      id: generateUUID(),
      productId: createProductImageDto.productId,
      imageId: createProductImageDto.imageId,
      description: createProductImageDto.description,
      createdAt: new Date(),
      createdBy: '',
    }

    const newProductImage = await this.#productImageRepo.create(productImage)

    return ProductImageMapper.toViewProductImageDTO(newProductImage)
  }
}
