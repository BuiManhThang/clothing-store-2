import { Coupon } from '../../../domain/entities/Coupon'
import { CreateCouponDTO, ViewCouponDTO } from '../../dtos/CouponDTO'
import { ICouponRepo } from '../../interfaces/repositories/ICouponRepo'
import { CouponMapper } from '../../mappers/CouponMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateCouponUseCase {
  readonly #couponRepo: ICouponRepo

  constructor(couponRepo: ICouponRepo) {
    this.#couponRepo = couponRepo
  }

  async execute(createCouponDto: CreateCouponDTO): Promise<ViewCouponDTO> {
    const coupon: Coupon = {
      id: generateUUID(),
      percent: createCouponDto.percent,
      expireDate: createCouponDto.expireDate,
      code: createCouponDto.code,
      description: createCouponDto.description,
      status: createCouponDto.status,
      createdAt: new Date(),
      createdBy: '',
    }

    const newCoupon = await this.#couponRepo.create(coupon)

    return CouponMapper.toViewCouponDTO(newCoupon)
  }
}
