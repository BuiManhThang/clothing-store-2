import { Request, Response } from 'express'
import { CreateCardUseCase } from '../../application/use-cases/card/CreateCardUseCase'
import { DeleteCardUseCase } from '../../application/use-cases/card/DeleteCardUseCase'
import { FindAllCardsUseCase } from '../../application/use-cases/card/FindAllCardsUseCase'
import { FindCardByIdUseCase } from '../../application/use-cases/card/FindCardByIdUseCase'
import { UpdateCardUseCase } from '../../application/use-cases/card/UpdateCardUseCase'
import { CreateCardDTO, UpdateCardDTO } from '../../application/dtos/CardDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class CardController extends BaseController {
  readonly #createCardUseCase: CreateCardUseCase
  readonly #updateCardUseCase: UpdateCardUseCase
  readonly #findCardByIdUseCase: FindCardByIdUseCase
  readonly #findAllCardsUseCase: FindAllCardsUseCase
  readonly #deleteCardUseCase: DeleteCardUseCase

  constructor(
    createCardUseCase: CreateCardUseCase,
    updateCardUseCase: UpdateCardUseCase,
    findCardByIdUseCase: FindCardByIdUseCase,
    findAllCardsUseCase: FindAllCardsUseCase,
    deleteCardUseCase: DeleteCardUseCase
  ) {
    super()
    this.#createCardUseCase = createCardUseCase
    this.#updateCardUseCase = updateCardUseCase
    this.#findCardByIdUseCase = findCardByIdUseCase
    this.#findAllCardsUseCase = findAllCardsUseCase
    this.#deleteCardUseCase = deleteCardUseCase
  }

  async create(req: Request, res: Response) {
    const createCardDTO: CreateCardDTO = req.body

    try {
      const createdCard = await this.#createCardUseCase.execute(createCardDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdCard)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const cardId = req.params.id
    const updateCardDTO: UpdateCardDTO = req.body

    try {
      const updatedCard = await this.#updateCardUseCase.execute(cardId, updateCardDTO)
      return res.status(HTTP_STATUS.OK).json(updatedCard)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const cardId = req.params.id

    try {
      const card = await this.#findCardByIdUseCase.execute(cardId)
      if (!card) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(card)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const cards = await this.#findAllCardsUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(cards)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const cardId = req.params.id

    try {
      await this.#deleteCardUseCase.execute(cardId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
