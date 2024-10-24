import { OrderDtoView } from '../../dtos/OrderDto'
import { IOrderRepo } from '../../../domain/interfaces/repositories/IOrderRepo'
import { OrderMapper } from '../../mappers/OrderMapper'

export class FindAllOrdersUseCase {
  readonly #orderRepo: IOrderRepo

  constructor(orderService: IOrderRepo) {
    this.#orderRepo = orderService
  }

  async execute(): Promise<OrderDtoView[]> {
    const orders = await this.#orderRepo.findAll()
    return orders.map((order) => OrderMapper.toOrderDtoView(order))
  }
}
