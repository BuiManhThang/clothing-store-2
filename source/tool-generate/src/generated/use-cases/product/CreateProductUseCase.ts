import { Product } from '../../../domain/entities/Product'
import { CreateProductDTO, ViewProductDTO } from '../../dtos/ProductDTO'
import { IProductRepo } from '../../interfaces/repositories/IProductRepo'
import { ProductMapper } from '../../mappers/ProductMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateProductUseCase {
  readonly #productRepo: IProductRepo

  constructor(productRepo: IProductRepo) {
    this.#productRepo = productRepo
  }

  async execute(createProductDto: CreateProductDTO): Promise<ViewProductDTO> {
    const product: Product = {
      id: generateUUID(),
      categoryId: createProductDto.categoryId,
      avatarId: createProductDto.avatarId,
      code: createProductDto.code,
      name: createProductDto.name,
      description: createProductDto.description,
      status: createProductDto.status,
      createdAt: new Date(),
      createdBy: '',
    }

    const newProduct = await this.#productRepo.create(product)

    return ProductMapper.toViewProductDTO(newProduct)
  }
}
