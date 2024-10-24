import { OrderDetailDtoView } from '../../dtos/OrderDetailDto'
import { IOrderDetailRepo } from '../../../domain/interfaces/repositories/IOrderDetailRepo'
import { OrderDetailMapper } from '../../mappers/OrderDetailMapper'

export class FindAllOrderDetailsUseCase {
  readonly #orderDetailRepo: IOrderDetailRepo

  constructor(orderDetailService: IOrderDetailRepo) {
    this.#orderDetailRepo = orderDetailService
  }

  async execute(): Promise<OrderDetailDtoView[]> {
    const orderDetails = await this.#orderDetailRepo.findAll()
    return orderDetails.map((orderDetail) => OrderDetailMapper.toOrderDetailDtoView(orderDetail))
  }
}
