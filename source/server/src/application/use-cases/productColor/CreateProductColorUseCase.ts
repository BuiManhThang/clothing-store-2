import { ProductColor } from '../../../domain/entities/ProductColor'
import { CreateProductColorDTO, ViewProductColorDTO } from '../../dtos/ProductColorDTO'
import { IProductColorRepo } from '../../../domain/interfaces/repositories/IProductColorRepo'
import { ProductColorMapper } from '../../mappers/ProductColorMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateProductColorUseCase {
  readonly #productColorRepo: IProductColorRepo

  constructor(productColorRepo: IProductColorRepo) {
    this.#productColorRepo = productColorRepo
  }

  async execute(createProductColorDto: CreateProductColorDTO): Promise<ViewProductColorDTO> {
    const productColor: ProductColor = {
      id: generateUUID(),
      order: createProductColorDto.order,
      productId: createProductColorDto.productId,
      status: createProductColorDto.status,
      code: createProductColorDto.code,
      name: createProductColorDto.name,
      description: createProductColorDto.description,
      createdAt: new Date(),
      createdBy: '',
    }

    const newProductColor = await this.#productColorRepo.create(productColor)

    return ProductColorMapper.toViewProductColorDTO(newProductColor)
  }
}
