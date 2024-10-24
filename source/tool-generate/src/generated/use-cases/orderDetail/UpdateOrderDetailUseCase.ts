import { OrderDetail } from '../../../domain/entities/OrderDetail'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { OrderDetailDtoUpdate, OrderDetailDtoView } from '../../dtos/OrderDetailDto'
import { IOrderDetailRepo } from '../../../domain/interfaces/repositories/IOrderDetailRepo'
import { OrderDetailMapper } from '../../mappers/OrderDetailMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateOrderDetailUseCase {
  readonly #orderDetailRepo: IOrderDetailRepo

  constructor(orderDetailRepo: IOrderDetailRepo) {
    this.#orderDetailRepo = orderDetailRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updateorderDetailDto: OrderDetailDtoUpdate): Promise<OrderDetailDtoView | null> {
    const oldOrderDetail = await this.#orderDetailRepo.findById(id)
    if (!oldOrderDetail) throw new NotFoundError('')

    const orderDetail: OrderDetail = {
      id: oldOrderDetail.id,
      sizeId: updateorderDetailDto.sizeId,
      quantity: updateorderDetailDto.quantity,
      price: updateorderDetailDto.price,
      orderId: updateorderDetailDto.orderId,
      productId: updateorderDetailDto.productId,
      colorId: updateorderDetailDto.colorId,
      productCode: updateorderDetailDto.productCode,
      productName: updateorderDetailDto.productName,
      colorCode: updateorderDetailDto.colorCode,
      colorName: updateorderDetailDto.colorName,
      sizeName: updateorderDetailDto.sizeName,
      createdAt: oldOrderDetail.createdAt,
      createdBy: oldOrderDetail.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedOrderDetail = await this.#orderDetailRepo.update(id, orderDetail)

    if (updatedOrderDetail) return OrderDetailMapper.toOrderDetailDtoView(updatedOrderDetail)
    return null
  }
}
