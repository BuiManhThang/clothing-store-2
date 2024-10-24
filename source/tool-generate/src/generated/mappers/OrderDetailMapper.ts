import { OrderDetail } from '../../domain/entities/OrderDetail'
import { OrderDetailDtoView } from '../dtos/OrderDetailDto'

export class OrderDetailMapper {
  static toOrderDetailDtoView(orderDetail: OrderDetail): OrderDetailDtoView {
    return orderDetail
  }
}
