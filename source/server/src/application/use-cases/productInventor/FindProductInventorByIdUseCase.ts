import { ViewProductInventorDTO } from '../../dtos/ProductInventorDTO'
import { IProductInventorRepo } from '../../../domain/interfaces/repositories/IProductInventorRepo'
import { ProductInventorMapper } from '../../mappers/ProductInventorMapper'

export class FindProductInventorByIdUseCase {
  readonly #productInventorRepo: IProductInventorRepo

  constructor(productInventorRepo: IProductInventorRepo) {
    this.#productInventorRepo = productInventorRepo
  }

  async execute(id: string): Promise<ViewProductInventorDTO | null> {
    const productInventor = await this.#productInventorRepo.findById(id)
    if (!productInventor) return null
    return ProductInventorMapper.toViewProductInventorDTO(productInventor)
  }
}
