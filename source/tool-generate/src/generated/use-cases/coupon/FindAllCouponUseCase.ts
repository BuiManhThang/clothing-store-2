import { ViewCouponDTO } from '../../dtos/CouponDTO'
import { ICouponRepo } from '../../interfaces/repositories/ICouponRepo'
import { CouponMapper } from '../../mappers/CouponMapper'

export class FindAllCouponUseCase {
  readonly #couponRepo: ICouponRepo

  constructor(couponService: ICouponRepo) {
    this.#couponRepo = couponService
  }

  async execute(): Promise<ViewCouponDTO[]> {
    const coupon = await this.#couponRepo.findAll()
    return coupon.map((coupon) => CouponMapper.toViewCouponDTO(coupon))
  }
}
