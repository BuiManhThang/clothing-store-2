import { Order } from '../../../domain/entities/Order'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { OrderDtoUpdate, OrderDtoView } from '../../dtos/OrderDto'
import { IOrderRepo } from '../../../domain/interfaces/repositories/IOrderRepo'
import { OrderMapper } from '../../mappers/OrderMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateOrderUseCase {
  readonly #orderRepo: IOrderRepo

  constructor(orderRepo: IOrderRepo) {
    this.#orderRepo = orderRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updateorderDto: OrderDtoUpdate): Promise<OrderDtoView | null> {
    const oldOrder = await this.#orderRepo.findById(id)
    if (!oldOrder) throw new NotFoundError('')

    const order: Order = {
      id: oldOrder.id,
      orderDate: updateorderDto.orderDate,
      totalMoney: updateorderDto.totalMoney,
      totalProduct: updateorderDto.totalProduct,
      couponPercent: updateorderDto.couponPercent,
      finalTotalMoney: updateorderDto.finalTotalMoney,
      createdUserId: updateorderDto.createdUserId,
      couponId: updateorderDto.couponId,
      district: updateorderDto.district,
      code: updateorderDto.code,
      address: updateorderDto.address,
      email: updateorderDto.email,
      phoneNumber: updateorderDto.phoneNumber,
      status: updateorderDto.status,
      description: updateorderDto.description,
      city: updateorderDto.city,
      createdAt: oldOrder.createdAt,
      createdBy: oldOrder.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedOrder = await this.#orderRepo.update(id, order)

    if (updatedOrder) return OrderMapper.toOrderDtoView(updatedOrder)
    return null
  }
}
