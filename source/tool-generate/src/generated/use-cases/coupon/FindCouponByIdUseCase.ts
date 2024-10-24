import { CouponDtoView } from '../../dtos/CouponDto'
import { ICouponRepo } from '../../../domain/interfaces/repositories/ICouponRepo'
import { CouponMapper } from '../../mappers/CouponMapper'

export class FindCouponByIdUseCase {
  readonly #couponRepo: ICouponRepo

  constructor(couponRepo: ICouponRepo) {
    this.#couponRepo = couponRepo
  }

  async execute(id: string): Promise<CouponDtoView | null> {
    const coupon = await this.#couponRepo.findById(id)
    if (!coupon) return null
    return CouponMapper.toCouponDtoView(coupon)
  }
}
