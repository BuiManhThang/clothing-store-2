import { Request, Response, NextFunction } from 'express'
import { CreateCouponUseCase } from '../../application/use-cases/coupon/CreateCouponUseCase'
import { DeleteCouponUseCase } from '../../application/use-cases/coupon/DeleteCouponUseCase'
import { FindAllCouponsUseCase } from '../../application/use-cases/coupon/FindAllCouponsUseCase'
import { GetCouponPaginationUseCase } from '../../application/use-cases/coupon/GetCouponPaginationUseCase'
import { FindCouponByIdUseCase } from '../../application/use-cases/coupon/FindCouponByIdUseCase'
import { UpdateCouponUseCase } from '../../application/use-cases/coupon/UpdateCouponUseCase'
import { CouponDtoCreate, CouponDtoUpdate } from '../../application/dtos/CouponDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class CouponController extends BaseController {
  readonly #createCouponUseCase: CreateCouponUseCase
  readonly #updateCouponUseCase: UpdateCouponUseCase
  readonly #findCouponByIdUseCase: FindCouponByIdUseCase
  readonly #findAllCouponsUseCase: FindAllCouponsUseCase
  readonly #getPaginationCouponUseCase: GetCouponPaginationUseCase
  readonly #deleteCouponUseCase: DeleteCouponUseCase

  constructor(
    createCouponUseCase: CreateCouponUseCase,
    updateCouponUseCase: UpdateCouponUseCase,
    findCouponByIdUseCase: FindCouponByIdUseCase,
    findAllCouponsUseCase: FindAllCouponsUseCase,
    getPaginationCouponUseCase: GetCouponPaginationUseCase,
    deleteCouponUseCase: DeleteCouponUseCase
  ) {
    super()
    this.#createCouponUseCase = createCouponUseCase
    this.#updateCouponUseCase = updateCouponUseCase
    this.#findCouponByIdUseCase = findCouponByIdUseCase
    this.#findAllCouponsUseCase = findAllCouponsUseCase
    this.#getPaginationCouponUseCase = getPaginationCouponUseCase
    this.#deleteCouponUseCase = deleteCouponUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createCouponDto: CouponDtoCreate = req.body

    try {
      const createdCoupon = await this.#createCouponUseCase.execute(req.userContextService, createCouponDto)
      return res.status(HTTP_STATUS.CREATED).json(createdCoupon)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const couponId = req.params.id
    const updateCouponDto: CouponDtoUpdate = req.body

    try {
      const updatedCoupon = await this.#updateCouponUseCase.execute(req.userContextService, couponId, updateCouponDto)
      return res.status(HTTP_STATUS.OK).json(updatedCoupon)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const couponId = req.params.id

    try {
      const coupon = await this.#findCouponByIdUseCase.execute(couponId)
      if (!coupon) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(coupon)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const coupons = await this.#findAllCouponsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(coupons)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationCouponUseCase.execute(
        pageSize,
        pageIndex,
        req.query.sort?.toString(),
        req.query.sortDirection?.toString(),
      )

      return res.status(HTTP_STATUS.OK).json(paginationResult)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const couponId = req.params.id

    try {
      await this.#deleteCouponUseCase.execute(couponId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
