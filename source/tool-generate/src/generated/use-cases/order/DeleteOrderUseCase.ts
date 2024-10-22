import { IOrderRepo } from '../../interfaces/repositories/IOrderRepo'

export class DeleteOrderUseCase {
  readonly #orderRepo: IOrderRepo

  constructor(orderService: IOrderRepo) {
    this.#orderRepo = orderService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#orderRepo.delete(id)
  }
}
