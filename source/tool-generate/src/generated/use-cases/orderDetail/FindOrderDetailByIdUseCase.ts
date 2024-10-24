import { OrderDetailDtoView } from '../../dtos/OrderDetailDto'
import { IOrderDetailRepo } from '../../../domain/interfaces/repositories/IOrderDetailRepo'
import { OrderDetailMapper } from '../../mappers/OrderDetailMapper'

export class FindOrderDetailByIdUseCase {
  readonly #orderDetailRepo: IOrderDetailRepo

  constructor(orderDetailRepo: IOrderDetailRepo) {
    this.#orderDetailRepo = orderDetailRepo
  }

  async execute(id: string): Promise<OrderDetailDtoView | null> {
    const orderDetail = await this.#orderDetailRepo.findById(id)
    if (!orderDetail) return null
    return OrderDetailMapper.toOrderDetailDtoView(orderDetail)
  }
}
