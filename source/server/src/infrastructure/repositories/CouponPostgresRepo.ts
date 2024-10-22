import { ICouponRepo } from '../../domain/interfaces/repositories/ICouponRepo'
import { Coupon } from '../../domain/entities/Coupon'
import { BasePostgresRepo } from './BasePostgresRepo'

export class CouponPostgresRepo extends BasePostgresRepo<Coupon> implements ICouponRepo {
  constructor() {
    super('coupons')
  }
}
