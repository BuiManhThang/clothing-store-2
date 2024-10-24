import { Coupon } from '../../../domain/entities/Coupon'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { CouponDtoUpdate, CouponDtoView } from '../../dtos/CouponDto'
import { ICouponRepo } from '../../../domain/interfaces/repositories/ICouponRepo'
import { CouponMapper } from '../../mappers/CouponMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateCouponUseCase {
  readonly #couponRepo: ICouponRepo

  constructor(couponRepo: ICouponRepo) {
    this.#couponRepo = couponRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updatecouponDto: CouponDtoUpdate): Promise<CouponDtoView | null> {
    const oldCoupon = await this.#couponRepo.findById(id)
    if (!oldCoupon) throw new NotFoundError('')

    const coupon: Coupon = {
      id: oldCoupon.id,
      percent: updatecouponDto.percent,
      expireDate: updatecouponDto.expireDate,
      code: updatecouponDto.code,
      description: updatecouponDto.description,
      status: updatecouponDto.status,
      createdAt: oldCoupon.createdAt,
      createdBy: oldCoupon.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedCoupon = await this.#couponRepo.update(id, coupon)

    if (updatedCoupon) return CouponMapper.toCouponDtoView(updatedCoupon)
    return null
  }
}
