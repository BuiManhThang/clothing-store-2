import { ViewOrderDetailDTO } from '../../dtos/OrderDetailDTO'
import { IOrderDetailRepo } from '../../../domain/interfaces/repositories/IOrderDetailRepo'
import { OrderDetailMapper } from '../../mappers/OrderDetailMapper'

export class FindOrderDetailByIdUseCase {
  readonly #orderDetailRepo: IOrderDetailRepo

  constructor(orderDetailRepo: IOrderDetailRepo) {
    this.#orderDetailRepo = orderDetailRepo
  }

  async execute(id: string): Promise<ViewOrderDetailDTO | null> {
    const orderDetail = await this.#orderDetailRepo.findById(id)
    if (!orderDetail) return null
    return OrderDetailMapper.toViewOrderDetailDTO(orderDetail)
  }
}
