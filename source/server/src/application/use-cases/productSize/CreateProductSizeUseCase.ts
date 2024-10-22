import { ProductSize } from '../../../domain/entities/ProductSize'
import { CreateProductSizeDTO, ViewProductSizeDTO } from '../../dtos/ProductSizeDTO'
import { IProductSizeRepo } from '../../../domain/interfaces/repositories/IProductSizeRepo'
import { ProductSizeMapper } from '../../mappers/ProductSizeMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateProductSizeUseCase {
  readonly #productSizeRepo: IProductSizeRepo

  constructor(productSizeRepo: IProductSizeRepo) {
    this.#productSizeRepo = productSizeRepo
  }

  async execute(createProductSizeDto: CreateProductSizeDTO): Promise<ViewProductSizeDTO> {
    const productSize: ProductSize = {
      id: generateUUID(),
      productId: createProductSizeDto.productId,
      order: createProductSizeDto.order,
      name: createProductSizeDto.name,
      description: createProductSizeDto.description,
      status: createProductSizeDto.status,
      createdAt: new Date(),
      createdBy: '',
    }

    const newProductSize = await this.#productSizeRepo.create(productSize)

    return ProductSizeMapper.toViewProductSizeDTO(newProductSize)
  }
}
