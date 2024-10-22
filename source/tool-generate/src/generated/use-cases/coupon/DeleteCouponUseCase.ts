import { ICouponRepo } from '../../interfaces/repositories/ICouponRepo'

export class DeleteCouponUseCase {
  readonly #couponRepo: ICouponRepo

  constructor(couponService: ICouponRepo) {
    this.#couponRepo = couponService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#couponRepo.delete(id)
  }
}
