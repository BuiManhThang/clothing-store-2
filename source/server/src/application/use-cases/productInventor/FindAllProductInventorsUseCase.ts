import { ViewProductInventorDTO } from '../../dtos/ProductInventorDTO'
import { IProductInventorRepo } from '../../../domain/interfaces/repositories/IProductInventorRepo'
import { ProductInventorMapper } from '../../mappers/ProductInventorMapper'

export class FindAllProductInventorsUseCase {
  readonly #productInventorRepo: IProductInventorRepo

  constructor(productInventorService: IProductInventorRepo) {
    this.#productInventorRepo = productInventorService
  }

  async execute(): Promise<ViewProductInventorDTO[]> {
    const productInventors = await this.#productInventorRepo.findAll()
    return productInventors.map((productInventor) =>
      ProductInventorMapper.toViewProductInventorDTO(productInventor)
    )
  }
}
