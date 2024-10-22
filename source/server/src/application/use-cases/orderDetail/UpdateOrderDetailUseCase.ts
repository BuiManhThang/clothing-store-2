import { OrderDetail } from '../../../domain/entities/OrderDetail'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateOrderDetailDTO, ViewOrderDetailDTO } from '../../dtos/OrderDetailDTO'
import { IOrderDetailRepo } from '../../../domain/interfaces/repositories/IOrderDetailRepo'
import { OrderDetailMapper } from '../../mappers/OrderDetailMapper'

export class UpdateOrderDetailUseCase {
  readonly #orderDetailRepo: IOrderDetailRepo

  constructor(orderDetailRepo: IOrderDetailRepo) {
    this.#orderDetailRepo = orderDetailRepo
  }

  async execute(
    id: string,
    updateorderDetailDTO: UpdateOrderDetailDTO
  ): Promise<ViewOrderDetailDTO | null> {
    const oldOrderDetail = await this.#orderDetailRepo.findById(id)
    if (!oldOrderDetail) throw new NotFoundError('')

    const orderDetail: OrderDetail = {
      id: oldOrderDetail.id,
      sizeId: updateorderDetailDTO.sizeId,
      quantity: updateorderDetailDTO.quantity,
      price: updateorderDetailDTO.price,
      orderId: updateorderDetailDTO.orderId,
      productId: updateorderDetailDTO.productId,
      colorId: updateorderDetailDTO.colorId,
      productCode: updateorderDetailDTO.productCode,
      productName: updateorderDetailDTO.productName,
      colorCode: updateorderDetailDTO.colorCode,
      colorName: updateorderDetailDTO.colorName,
      sizeName: updateorderDetailDTO.sizeName,
      createdAt: oldOrderDetail.createdAt,
      createdBy: oldOrderDetail.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedOrderDetail = await this.#orderDetailRepo.update(id, orderDetail)

    if (updatedOrderDetail) return OrderDetailMapper.toViewOrderDetailDTO(updatedOrderDetail)
    return null
  }
}
