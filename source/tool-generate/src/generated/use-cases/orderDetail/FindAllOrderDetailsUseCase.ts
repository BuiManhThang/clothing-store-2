import { ViewOrderDetailDTO } from '../../dtos/OrderDetailDTO'
import { IOrderDetailRepo } from '../../interfaces/repositories/IOrderDetailRepo'
import { OrderDetailMapper } from '../../mappers/OrderDetailMapper'

export class FindAllOrderDetailsUseCase {
  readonly #orderDetailRepo: IOrderDetailRepo

  constructor(orderDetailService: IOrderDetailRepo) {
    this.#orderDetailRepo = orderDetailService
  }

  async execute(): Promise<ViewOrderDetailDTO[]> {
    const orderDetails = await this.#orderDetailRepo.findAll()
    return orderDetails.map((orderDetail) => OrderDetailMapper.toViewOrderDetailDTO(orderDetail))
  }
}
