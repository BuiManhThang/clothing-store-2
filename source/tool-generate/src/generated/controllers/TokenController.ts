import { Request, Response } from 'express'
import { CreateTokenUseCase } from '../../application/use-cases/token/CreateTokenUseCase'
import { DeleteTokenUseCase } from '../../application/use-cases/token/DeleteTokenUseCase'
import { FindAllTokensUseCase } from '../../application/use-cases/token/FindAllTokensUseCase'
import { FindTokenByIdUseCase } from '../../application/use-cases/token/FindTokenByIdUseCase'
import { UpdateTokenUseCase } from '../../application/use-cases/token/UpdateTokenUseCase'
import { CreateTokenDTO, UpdateTokenDTO } from '../../application/dtos/TokenDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class TokenController extends BaseController {
  readonly #createTokenUseCase: CreateTokenUseCase
  readonly #updateTokenUseCase: UpdateTokenUseCase
  readonly #findTokenByIdUseCase: FindTokenByIdUseCase
  readonly #findAllTokensUseCase: FindAllTokensUseCase
  readonly #deleteTokenUseCase: DeleteTokenUseCase

  constructor(
    createTokenUseCase: CreateTokenUseCase,
    updateTokenUseCase: UpdateTokenUseCase,
    findTokenByIdUseCase: FindTokenByIdUseCase,
    findAllTokensUseCase: FindAllTokensUseCase,
    deleteTokenUseCase: DeleteTokenUseCase
  ) {
    super()
    this.#createTokenUseCase = createTokenUseCase
    this.#updateTokenUseCase = updateTokenUseCase
    this.#findTokenByIdUseCase = findTokenByIdUseCase
    this.#findAllTokensUseCase = findAllTokensUseCase
    this.#deleteTokenUseCase = deleteTokenUseCase
  }

  async create(req: Request, res: Response) {
    const createTokenDTO: CreateTokenDTO = req.body

    try {
      const createdToken = await this.#createTokenUseCase.execute(createTokenDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdToken)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const tokenId = req.params.id
    const updateTokenDTO: UpdateTokenDTO = req.body

    try {
      const updatedToken = await this.#updateTokenUseCase.execute(tokenId, updateTokenDTO)
      return res.status(HTTP_STATUS.OK).json(updatedToken)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const tokenId = req.params.id

    try {
      const token = await this.#findTokenByIdUseCase.execute(tokenId)
      if (!token) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(token)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const tokens = await this.#findAllTokensUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(tokens)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const tokenId = req.params.id

    try {
      await this.#deleteTokenUseCase.execute(tokenId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
