import { ICategoryRepo } from '../../interfaces/repositories/ICategoryRepo'

export class DeleteCategoryUseCase {
  readonly #categoryRepo: ICategoryRepo

  constructor(categoryService: ICategoryRepo) {
    this.#categoryRepo = categoryService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#categoryRepo.delete(id)
  }
}
