import { IProductInventorRepo } from '../../../domain/interfaces/repositories/IProductInventorRepo'

export class DeleteProductInventorUseCase {
  readonly #productInventorRepo: IProductInventorRepo

  constructor(productInventorService: IProductInventorRepo) {
    this.#productInventorRepo = productInventorService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#productInventorRepo.delete(id)
  }
}
