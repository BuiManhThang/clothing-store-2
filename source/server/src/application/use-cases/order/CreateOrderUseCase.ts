import { Order } from '../../../domain/entities/Order'
import { OrderDtoCreate, OrderDtoView } from '../../dtos/OrderDto'
import { IOrderRepo } from '../../../domain/interfaces/repositories/IOrderRepo'
import { OrderMapper } from '../../mappers/OrderMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateOrderUseCase {
  readonly #orderRepo: IOrderRepo

  constructor(orderRepo: IOrderRepo) {
    this.#orderRepo = orderRepo
  }

  async execute(userContextService: IUserContextService | undefined, createOrderDto: OrderDtoCreate): Promise<OrderDtoView> {
    const order: Order = {
      id: generateUUID(),
      orderDate: createOrderDto.orderDate,
      totalMoney: createOrderDto.totalMoney,
      totalProduct: createOrderDto.totalProduct,
      couponPercent: createOrderDto.couponPercent,
      finalTotalMoney: createOrderDto.finalTotalMoney,
      createdUserId: createOrderDto.createdUserId,
      couponId: createOrderDto.couponId,
      district: createOrderDto.district,
      code: createOrderDto.code,
      address: createOrderDto.address,
      email: createOrderDto.email,
      phoneNumber: createOrderDto.phoneNumber,
      status: createOrderDto.status,
      description: createOrderDto.description,
      city: createOrderDto.city,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newOrder = await this.#orderRepo.create(order)

    return OrderMapper.toOrderDtoView(newOrder)
  }
}
