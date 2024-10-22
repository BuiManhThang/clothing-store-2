import { Product } from '../../../domain/entities/Product'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateProductDTO, ViewProductDTO } from '../../dtos/ProductDTO'
import { IProductRepo } from '../../interfaces/repositories/IProductRepo'
import { ProductMapper } from '../../mappers/ProductMapper'

export class UpdateProductUseCase {
  readonly #productRepo: IProductRepo

  constructor(productRepo: IProductRepo) {
    this.#productRepo = productRepo
  }

  async execute(id: string, updateproductDTO: UpdateProductDTO): Promise<ViewProductDTO | null> {
    const oldProduct = await this.#productRepo.findById(id)
    if (!oldProduct) throw new NotFoundError('')

    const product: Product = {
      id: oldProduct.id,
      categoryId: updateproductDTO.categoryId,
      avatarId: updateproductDTO.avatarId,
      code: updateproductDTO.code,
      name: updateproductDTO.name,
      description: updateproductDTO.description,
      status: updateproductDTO.status,
      createdAt: oldProduct.createdAt,
      createdBy: oldProduct.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedProduct = await this.#productRepo.update(id, product)

    if (updatedProduct) return ProductMapper.toViewProductDTO(updatedProduct)
    return null
  }
}
