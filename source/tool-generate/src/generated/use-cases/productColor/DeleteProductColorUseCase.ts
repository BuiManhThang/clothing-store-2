import { IProductColorRepo } from '../../interfaces/repositories/IProductColorRepo'

export class DeleteProductColorUseCase {
  readonly #productColorRepo: IProductColorRepo

  constructor(productColorService: IProductColorRepo) {
    this.#productColorRepo = productColorService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#productColorRepo.delete(id)
  }
}
