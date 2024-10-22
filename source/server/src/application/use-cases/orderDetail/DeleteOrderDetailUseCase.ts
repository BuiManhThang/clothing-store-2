import { IOrderDetailRepo } from '../../../domain/interfaces/repositories/IOrderDetailRepo'

export class DeleteOrderDetailUseCase {
  readonly #orderDetailRepo: IOrderDetailRepo

  constructor(orderDetailService: IOrderDetailRepo) {
    this.#orderDetailRepo = orderDetailService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#orderDetailRepo.delete(id)
  }
}
