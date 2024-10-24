import { OrderDetail } from '../../../domain/entities/OrderDetail'
import { OrderDetailDtoCreate, OrderDetailDtoView } from '../../dtos/OrderDetailDto'
import { IOrderDetailRepo } from '../../../domain/interfaces/repositories/IOrderDetailRepo'
import { OrderDetailMapper } from '../../mappers/OrderDetailMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateOrderDetailUseCase {
  readonly #orderDetailRepo: IOrderDetailRepo

  constructor(orderDetailRepo: IOrderDetailRepo) {
    this.#orderDetailRepo = orderDetailRepo
  }

  async execute(userContextService: IUserContextService | undefined, createOrderDetailDto: OrderDetailDtoCreate): Promise<OrderDetailDtoView> {
    const orderDetail: OrderDetail = {
      id: generateUUID(),
      sizeId: createOrderDetailDto.sizeId,
      quantity: createOrderDetailDto.quantity,
      price: createOrderDetailDto.price,
      orderId: createOrderDetailDto.orderId,
      productId: createOrderDetailDto.productId,
      colorId: createOrderDetailDto.colorId,
      productCode: createOrderDetailDto.productCode,
      productName: createOrderDetailDto.productName,
      colorCode: createOrderDetailDto.colorCode,
      colorName: createOrderDetailDto.colorName,
      sizeName: createOrderDetailDto.sizeName,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newOrderDetail = await this.#orderDetailRepo.create(orderDetail)

    return OrderDetailMapper.toOrderDetailDtoView(newOrderDetail)
  }
}
