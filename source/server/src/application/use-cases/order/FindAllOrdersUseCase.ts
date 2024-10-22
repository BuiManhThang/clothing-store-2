import { ViewOrderDTO } from '../../dtos/OrderDTO'
import { IOrderRepo } from '../../../domain/interfaces/repositories/IOrderRepo'
import { OrderMapper } from '../../mappers/OrderMapper'

export class FindAllOrdersUseCase {
  readonly #orderRepo: IOrderRepo

  constructor(orderService: IOrderRepo) {
    this.#orderRepo = orderService
  }

  async execute(): Promise<ViewOrderDTO[]> {
    const orders = await this.#orderRepo.findAll()
    return orders.map((order) => OrderMapper.toViewOrderDTO(order))
  }
}
