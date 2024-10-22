import { ViewOrderDTO } from '../../dtos/OrderDTO'
import { IOrderRepo } from '../../interfaces/repositories/IOrderRepo'
import { OrderMapper } from '../../mappers/OrderMapper'

export class FindAllOrderUseCase {
  readonly #orderRepo: IOrderRepo

  constructor(orderService: IOrderRepo) {
    this.#orderRepo = orderService
  }

  async execute(): Promise<ViewOrderDTO[]> {
    const order = await this.#orderRepo.findAll()
    return order.map((order) => OrderMapper.toViewOrderDTO(order))
  }
}
