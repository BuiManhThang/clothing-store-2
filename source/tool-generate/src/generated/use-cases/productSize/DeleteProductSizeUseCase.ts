import { IProductSizeRepo } from '../../../domain/interfaces/repositories/IProductSizeRepo'

export class DeleteProductSizeUseCase {
  readonly #productSizeRepo: IProductSizeRepo

  constructor(productSizeService: IProductSizeRepo) {
    this.#productSizeRepo = productSizeService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#productSizeRepo.delete(id)
  }
}
