import { ViewOrderDTO } from '../../dtos/OrderDTO'
import { IOrderRepo } from '../../../domain/interfaces/repositories/IOrderRepo'
import { OrderMapper } from '../../mappers/OrderMapper'

export class FindOrderByIdUseCase {
  readonly #orderRepo: IOrderRepo

  constructor(orderRepo: IOrderRepo) {
    this.#orderRepo = orderRepo
  }

  async execute(id: string): Promise<ViewOrderDTO | null> {
    const order = await this.#orderRepo.findById(id)
    if (!order) return null
    return OrderMapper.toViewOrderDTO(order)
  }
}
