import { ViewOrderDetailDTO } from '../../dtos/OrderDetailDTO'
import { IOrderDetailRepo } from '../../interfaces/repositories/IOrderDetailRepo'
import { OrderDetailMapper } from '../../mappers/OrderDetailMapper'

export class FindAllOrderDetailUseCase {
  readonly #orderDetailRepo: IOrderDetailRepo

  constructor(orderDetailService: IOrderDetailRepo) {
    this.#orderDetailRepo = orderDetailService
  }

  async execute(): Promise<ViewOrderDetailDTO[]> {
    const orderDetail = await this.#orderDetailRepo.findAll()
    return orderDetail.map((orderDetail) => OrderDetailMapper.toViewOrderDetailDTO(orderDetail))
  }
}
