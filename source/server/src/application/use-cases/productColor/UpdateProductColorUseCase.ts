import { ProductColor } from '../../../domain/entities/ProductColor'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateProductColorDTO, ViewProductColorDTO } from '../../dtos/ProductColorDTO'
import { IProductColorRepo } from '../../../domain/interfaces/repositories/IProductColorRepo'
import { ProductColorMapper } from '../../mappers/ProductColorMapper'

export class UpdateProductColorUseCase {
  readonly #productColorRepo: IProductColorRepo

  constructor(productColorRepo: IProductColorRepo) {
    this.#productColorRepo = productColorRepo
  }

  async execute(
    id: string,
    updateproductColorDTO: UpdateProductColorDTO
  ): Promise<ViewProductColorDTO | null> {
    const oldProductColor = await this.#productColorRepo.findById(id)
    if (!oldProductColor) throw new NotFoundError('')

    const productColor: ProductColor = {
      id: oldProductColor.id,
      order: updateproductColorDTO.order,
      productId: updateproductColorDTO.productId,
      status: updateproductColorDTO.status,
      code: updateproductColorDTO.code,
      name: updateproductColorDTO.name,
      description: updateproductColorDTO.description,
      createdAt: oldProductColor.createdAt,
      createdBy: oldProductColor.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedProductColor = await this.#productColorRepo.update(id, productColor)

    if (updatedProductColor) return ProductColorMapper.toViewProductColorDTO(updatedProductColor)
    return null
  }
}
