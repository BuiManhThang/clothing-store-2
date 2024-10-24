import { Request, Response, NextFunction } from 'express'
import { CreateCardUseCase } from '../../application/use-cases/card/CreateCardUseCase'
import { DeleteCardUseCase } from '../../application/use-cases/card/DeleteCardUseCase'
import { FindAllCardsUseCase } from '../../application/use-cases/card/FindAllCardsUseCase'
import { GetCardPaginationUseCase } from '../../application/use-cases/card/GetCardPaginationUseCase'
import { FindCardByIdUseCase } from '../../application/use-cases/card/FindCardByIdUseCase'
import { UpdateCardUseCase } from '../../application/use-cases/card/UpdateCardUseCase'
import { CardDtoCreate, CardDtoUpdate } from '../../application/dtos/CardDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class CardController extends BaseController {
  readonly #createCardUseCase: CreateCardUseCase
  readonly #updateCardUseCase: UpdateCardUseCase
  readonly #findCardByIdUseCase: FindCardByIdUseCase
  readonly #findAllCardsUseCase: FindAllCardsUseCase
  readonly #getPaginationCardUseCase: GetCardPaginationUseCase
  readonly #deleteCardUseCase: DeleteCardUseCase

  constructor(
    createCardUseCase: CreateCardUseCase,
    updateCardUseCase: UpdateCardUseCase,
    findCardByIdUseCase: FindCardByIdUseCase,
    findAllCardsUseCase: FindAllCardsUseCase,
    getPaginationCardUseCase: GetCardPaginationUseCase,
    deleteCardUseCase: DeleteCardUseCase
  ) {
    super()
    this.#createCardUseCase = createCardUseCase
    this.#updateCardUseCase = updateCardUseCase
    this.#findCardByIdUseCase = findCardByIdUseCase
    this.#findAllCardsUseCase = findAllCardsUseCase
    this.#getPaginationCardUseCase = getPaginationCardUseCase
    this.#deleteCardUseCase = deleteCardUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createCardDto: CardDtoCreate = req.body

    try {
      const createdCard = await this.#createCardUseCase.execute(req.userContextService, createCardDto)
      return res.status(HTTP_STATUS.CREATED).json(createdCard)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const cardId = req.params.id
    const updateCardDto: CardDtoUpdate = req.body

    try {
      const updatedCard = await this.#updateCardUseCase.execute(req.userContextService, cardId, updateCardDto)
      return res.status(HTTP_STATUS.OK).json(updatedCard)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const cardId = req.params.id

    try {
      const card = await this.#findCardByIdUseCase.execute(cardId)
      if (!card) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(card)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const cards = await this.#findAllCardsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(cards)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationCardUseCase.execute(
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
    const cardId = req.params.id

    try {
      await this.#deleteCardUseCase.execute(cardId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
