import { Request, Response } from 'express'
import { CreateCouponUseCase } from '../../application/use-cases/coupon/CreateCouponUseCase'
import { DeleteCouponUseCase } from '../../application/use-cases/coupon/DeleteCouponUseCase'
import { FindAllCouponsUseCase } from '../../application/use-cases/coupon/FindAllCouponsUseCase'
import { FindCouponByIdUseCase } from '../../application/use-cases/coupon/FindCouponByIdUseCase'
import { UpdateCouponUseCase } from '../../application/use-cases/coupon/UpdateCouponUseCase'
import { CreateCouponDTO, UpdateCouponDTO } from '../../application/dtos/CouponDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class CouponController extends BaseController {
  readonly #createCouponUseCase: CreateCouponUseCase
  readonly #updateCouponUseCase: UpdateCouponUseCase
  readonly #findCouponByIdUseCase: FindCouponByIdUseCase
  readonly #findAllCouponsUseCase: FindAllCouponsUseCase
  readonly #deleteCouponUseCase: DeleteCouponUseCase

  constructor(
    createCouponUseCase: CreateCouponUseCase,
    updateCouponUseCase: UpdateCouponUseCase,
    findCouponByIdUseCase: FindCouponByIdUseCase,
    findAllCouponsUseCase: FindAllCouponsUseCase,
    deleteCouponUseCase: DeleteCouponUseCase
  ) {
    super()
    this.#createCouponUseCase = createCouponUseCase
    this.#updateCouponUseCase = updateCouponUseCase
    this.#findCouponByIdUseCase = findCouponByIdUseCase
    this.#findAllCouponsUseCase = findAllCouponsUseCase
    this.#deleteCouponUseCase = deleteCouponUseCase
  }

  async create(req: Request, res: Response) {
    const createCouponDTO: CreateCouponDTO = req.body

    try {
      const createdCoupon = await this.#createCouponUseCase.execute(createCouponDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdCoupon)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const couponId = req.params.id
    const updateCouponDTO: UpdateCouponDTO = req.body

    try {
      const updatedCoupon = await this.#updateCouponUseCase.execute(couponId, updateCouponDTO)
      return res.status(HTTP_STATUS.OK).json(updatedCoupon)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const couponId = req.params.id

    try {
      const coupon = await this.#findCouponByIdUseCase.execute(couponId)
      if (!coupon) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(coupon)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const coupons = await this.#findAllCouponsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(coupons)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const couponId = req.params.id

    try {
      await this.#deleteCouponUseCase.execute(couponId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
