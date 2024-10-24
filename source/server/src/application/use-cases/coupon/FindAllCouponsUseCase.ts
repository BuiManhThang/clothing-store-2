import { CouponDtoView } from '../../dtos/CouponDto'
import { ICouponRepo } from '../../../domain/interfaces/repositories/ICouponRepo'
import { CouponMapper } from '../../mappers/CouponMapper'

export class FindAllCouponsUseCase {
  readonly #couponRepo: ICouponRepo

  constructor(couponService: ICouponRepo) {
    this.#couponRepo = couponService
  }

  async execute(): Promise<CouponDtoView[]> {
    const coupons = await this.#couponRepo.findAll()
    return coupons.map((coupon) => CouponMapper.toCouponDtoView(coupon))
  }
}
