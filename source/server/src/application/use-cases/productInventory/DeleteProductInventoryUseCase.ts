import { IProductInventoryRepo } from '../../../domain/interfaces/repositories/IProductInventoryRepo'

export class DeleteProductInventoryUseCase {
  readonly #productInventoryRepo: IProductInventoryRepo

  constructor(productInventoryService: IProductInventoryRepo) {
    this.#productInventoryRepo = productInventoryService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#productInventoryRepo.delete(id)
  }
}
