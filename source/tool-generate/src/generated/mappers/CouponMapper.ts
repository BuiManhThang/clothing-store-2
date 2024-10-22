import { Coupon } from '../../domain/entities/Coupon'
import { ViewCouponDTO } from '../dtos/CouponDTO'

export class CouponMapper {
  static toViewCouponDTO(coupon: Coupon): ViewCouponDTO {
    return coupon
  }
}
