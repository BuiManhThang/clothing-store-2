import { Request, Response } from 'express'
import { CreateReviewUseCase } from '../../application/use-cases/review/CreateReviewUseCase'
import { DeleteReviewUseCase } from '../../application/use-cases/review/DeleteReviewUseCase'
import { FindAllReviewsUseCase } from '../../application/use-cases/review/FindAllReviewsUseCase'
import { FindReviewByIdUseCase } from '../../application/use-cases/review/FindReviewByIdUseCase'
import { UpdateReviewUseCase } from '../../application/use-cases/review/UpdateReviewUseCase'
import { CreateReviewDTO, UpdateReviewDTO } from '../../application/dtos/ReviewDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class ReviewController extends BaseController {
  readonly #createReviewUseCase: CreateReviewUseCase
  readonly #updateReviewUseCase: UpdateReviewUseCase
  readonly #findReviewByIdUseCase: FindReviewByIdUseCase
  readonly #findAllReviewsUseCase: FindAllReviewsUseCase
  readonly #deleteReviewUseCase: DeleteReviewUseCase

  constructor(
    createReviewUseCase: CreateReviewUseCase,
    updateReviewUseCase: UpdateReviewUseCase,
    findReviewByIdUseCase: FindReviewByIdUseCase,
    findAllReviewsUseCase: FindAllReviewsUseCase,
    deleteReviewUseCase: DeleteReviewUseCase
  ) {
    super()
    this.#createReviewUseCase = createReviewUseCase
    this.#updateReviewUseCase = updateReviewUseCase
    this.#findReviewByIdUseCase = findReviewByIdUseCase
    this.#findAllReviewsUseCase = findAllReviewsUseCase
    this.#deleteReviewUseCase = deleteReviewUseCase
  }

  async create(req: Request, res: Response) {
    const createReviewDTO: CreateReviewDTO = req.body

    try {
      const createdReview = await this.#createReviewUseCase.execute(createReviewDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdReview)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const reviewId = req.params.id
    const updateReviewDTO: UpdateReviewDTO = req.body

    try {
      const updatedReview = await this.#updateReviewUseCase.execute(reviewId, updateReviewDTO)
      return res.status(HTTP_STATUS.OK).json(updatedReview)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const reviewId = req.params.id

    try {
      const review = await this.#findReviewByIdUseCase.execute(reviewId)
      if (!review) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(review)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const reviews = await this.#findAllReviewsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(reviews)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const reviewId = req.params.id

    try {
      await this.#deleteReviewUseCase.execute(reviewId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
