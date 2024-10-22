import { OrderDetail } from '../../../domain/entities/OrderDetail'
import { CreateOrderDetailDTO, ViewOrderDetailDTO } from '../../dtos/OrderDetailDTO'
import { IOrderDetailRepo } from '../../../domain/interfaces/repositories/IOrderDetailRepo'
import { OrderDetailMapper } from '../../mappers/OrderDetailMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateOrderDetailUseCase {
  readonly #orderDetailRepo: IOrderDetailRepo

  constructor(orderDetailRepo: IOrderDetailRepo) {
    this.#orderDetailRepo = orderDetailRepo
  }

  async execute(createOrderDetailDto: CreateOrderDetailDTO): Promise<ViewOrderDetailDTO> {
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
      createdBy: '',
    }

    const newOrderDetail = await this.#orderDetailRepo.create(orderDetail)

    return OrderDetailMapper.toViewOrderDetailDTO(newOrderDetail)
  }
}
