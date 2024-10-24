import { IProductRepo } from '../../../domain/interfaces/repositories/IProductRepo'

export class DeleteProductUseCase {
  readonly #productRepo: IProductRepo

  constructor(productService: IProductRepo) {
    this.#productRepo = productService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#productRepo.delete(id)
  }
}
