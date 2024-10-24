import { Request, Response, NextFunction } from 'express'
import { CreateReviewUseCase } from '../../application/use-cases/review/CreateReviewUseCase'
import { DeleteReviewUseCase } from '../../application/use-cases/review/DeleteReviewUseCase'
import { FindAllReviewsUseCase } from '../../application/use-cases/review/FindAllReviewsUseCase'
import { GetReviewPaginationUseCase } from '../../application/use-cases/review/GetReviewPaginationUseCase'
import { FindReviewByIdUseCase } from '../../application/use-cases/review/FindReviewByIdUseCase'
import { UpdateReviewUseCase } from '../../application/use-cases/review/UpdateReviewUseCase'
import { ReviewDtoCreate, ReviewDtoUpdate } from '../../application/dtos/ReviewDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ReviewController extends BaseController {
  readonly #createReviewUseCase: CreateReviewUseCase
  readonly #updateReviewUseCase: UpdateReviewUseCase
  readonly #findReviewByIdUseCase: FindReviewByIdUseCase
  readonly #findAllReviewsUseCase: FindAllReviewsUseCase
  readonly #getPaginationReviewUseCase: GetReviewPaginationUseCase
  readonly #deleteReviewUseCase: DeleteReviewUseCase

  constructor(
    createReviewUseCase: CreateReviewUseCase,
    updateReviewUseCase: UpdateReviewUseCase,
    findReviewByIdUseCase: FindReviewByIdUseCase,
    findAllReviewsUseCase: FindAllReviewsUseCase,
    getPaginationReviewUseCase: GetReviewPaginationUseCase,
    deleteReviewUseCase: DeleteReviewUseCase
  ) {
    super()
    this.#createReviewUseCase = createReviewUseCase
    this.#updateReviewUseCase = updateReviewUseCase
    this.#findReviewByIdUseCase = findReviewByIdUseCase
    this.#findAllReviewsUseCase = findAllReviewsUseCase
    this.#getPaginationReviewUseCase = getPaginationReviewUseCase
    this.#deleteReviewUseCase = deleteReviewUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createReviewDto: ReviewDtoCreate = req.body

    try {
      const createdReview = await this.#createReviewUseCase.execute(req.userContextService, createReviewDto)
      return res.status(HTTP_STATUS.CREATED).json(createdReview)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const reviewId = req.params.id
    const updateReviewDto: ReviewDtoUpdate = req.body

    try {
      const updatedReview = await this.#updateReviewUseCase.execute(req.userContextService, reviewId, updateReviewDto)
      return res.status(HTTP_STATUS.OK).json(updatedReview)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const reviewId = req.params.id

    try {
      const review = await this.#findReviewByIdUseCase.execute(reviewId)
      if (!review) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(review)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const reviews = await this.#findAllReviewsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(reviews)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationReviewUseCase.execute(
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
    const reviewId = req.params.id

    try {
      await this.#deleteReviewUseCase.execute(reviewId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
