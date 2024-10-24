import { Coupon } from '../../domain/entities/Coupon'
import { CouponDtoView } from '../dtos/CouponDto'

export class CouponMapper {
  static toCouponDtoView(coupon: Coupon): CouponDtoView {
    return coupon
  }
}
