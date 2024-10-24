import { Coupon } from '../../../domain/entities/Coupon'
import { CouponDtoCreate, CouponDtoView } from '../../dtos/CouponDto'
import { ICouponRepo } from '../../../domain/interfaces/repositories/ICouponRepo'
import { CouponMapper } from '../../mappers/CouponMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateCouponUseCase {
  readonly #couponRepo: ICouponRepo

  constructor(couponRepo: ICouponRepo) {
    this.#couponRepo = couponRepo
  }

  async execute(userContextService: IUserContextService | undefined, createCouponDto: CouponDtoCreate): Promise<CouponDtoView> {
    const coupon: Coupon = {
      id: generateUUID(),
      percent: createCouponDto.percent,
      expireDate: createCouponDto.expireDate,
      code: createCouponDto.code,
      description: createCouponDto.description,
      status: createCouponDto.status,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newCoupon = await this.#couponRepo.create(coupon)

    return CouponMapper.toCouponDtoView(newCoupon)
  }
}
