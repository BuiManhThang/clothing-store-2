import { Coupon } from '../../../domain/entities/Coupon'
import { IBaseRepo } from './IBaseRepo'

export interface ICouponRepo extends IBaseRepo<Coupon> {}