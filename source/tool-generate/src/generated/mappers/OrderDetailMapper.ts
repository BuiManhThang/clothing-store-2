import { OrderDetail } from '../../domain/entities/OrderDetail'
import { ViewOrderDetailDTO } from '../dtos/OrderDetailDTO'

export class OrderDetailMapper {
  static toViewOrderDetailDTO(orderDetail: OrderDetail): ViewOrderDetailDTO {
    return orderDetail
  }
}
