import { ViewCouponDTO } from '../../dtos/CouponDTO'
import { ICouponRepo } from '../../../domain/interfaces/repositories/ICouponRepo'
import { CouponMapper } from '../../mappers/CouponMapper'

export class FindAllCouponsUseCase {
  readonly #couponRepo: ICouponRepo

  constructor(couponService: ICouponRepo) {
    this.#couponRepo = couponService
  }

  async execute(): Promise<ViewCouponDTO[]> {
    const coupons = await this.#couponRepo.findAll()
    return coupons.map((coupon) => CouponMapper.toViewCouponDTO(coupon))
  }
}
