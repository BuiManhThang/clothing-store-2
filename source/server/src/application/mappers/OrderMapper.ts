import { Order } from '../../domain/entities/Order'
import { OrderDtoView } from '../dtos/OrderDto'

export class OrderMapper {
  static toOrderDtoView(order: Order): OrderDtoView {
    return order
  }
}
