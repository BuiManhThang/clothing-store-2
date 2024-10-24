import { IProductImageRepo } from '../../../domain/interfaces/repositories/IProductImageRepo'

export class DeleteProductImageUseCase {
  readonly #productImageRepo: IProductImageRepo

  constructor(productImageService: IProductImageRepo) {
    this.#productImageRepo = productImageService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#productImageRepo.delete(id)
  }
}
