import { Coupon } from '../../../domain/entities/Coupon'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateCouponDTO, ViewCouponDTO } from '../../dtos/CouponDTO'
import { ICouponRepo } from '../../interfaces/repositories/ICouponRepo'
import { CouponMapper } from '../../mappers/CouponMapper'

export class UpdateCouponUseCase {
  readonly #couponRepo: ICouponRepo

  constructor(couponRepo: ICouponRepo) {
    this.#couponRepo = couponRepo
  }

  async execute(id: string, updatecouponDTO: UpdateCouponDTO): Promise<ViewCouponDTO | null> {
    const oldCoupon = await this.#couponRepo.findById(id)
    if (!oldCoupon) throw new NotFoundError('')

    const coupon: Coupon = {
      id: oldCoupon.id,
      percent: updatecouponDTO.percent,
      expireDate: updatecouponDTO.expireDate,
      code: updatecouponDTO.code,
      description: updatecouponDTO.description,
      status: updatecouponDTO.status,
      createdAt: oldCoupon.createdAt,
      createdBy: oldCoupon.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedCoupon = await this.#couponRepo.update(id, coupon)

    if (updatedCoupon) return CouponMapper.toViewCouponDTO(updatedCoupon)
    return null
  }
}
