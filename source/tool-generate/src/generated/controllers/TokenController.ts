import { Request, Response, NextFunction } from 'express'
import { CreateTokenUseCase } from '../../application/use-cases/token/CreateTokenUseCase'
import { DeleteTokenUseCase } from '../../application/use-cases/token/DeleteTokenUseCase'
import { FindAllTokensUseCase } from '../../application/use-cases/token/FindAllTokensUseCase'
import { GetTokenPaginationUseCase } from '../../application/use-cases/token/GetTokenPaginationUseCase'
import { FindTokenByIdUseCase } from '../../application/use-cases/token/FindTokenByIdUseCase'
import { UpdateTokenUseCase } from '../../application/use-cases/token/UpdateTokenUseCase'
import { TokenDtoCreate, TokenDtoUpdate } from '../../application/dtos/TokenDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class TokenController extends BaseController {
  readonly #createTokenUseCase: CreateTokenUseCase
  readonly #updateTokenUseCase: UpdateTokenUseCase
  readonly #findTokenByIdUseCase: FindTokenByIdUseCase
  readonly #findAllTokensUseCase: FindAllTokensUseCase
  readonly #getPaginationTokenUseCase: GetTokenPaginationUseCase
  readonly #deleteTokenUseCase: DeleteTokenUseCase

  constructor(
    createTokenUseCase: CreateTokenUseCase,
    updateTokenUseCase: UpdateTokenUseCase,
    findTokenByIdUseCase: FindTokenByIdUseCase,
    findAllTokensUseCase: FindAllTokensUseCase,
    getPaginationTokenUseCase: GetTokenPaginationUseCase,
    deleteTokenUseCase: DeleteTokenUseCase
  ) {
    super()
    this.#createTokenUseCase = createTokenUseCase
    this.#updateTokenUseCase = updateTokenUseCase
    this.#findTokenByIdUseCase = findTokenByIdUseCase
    this.#findAllTokensUseCase = findAllTokensUseCase
    this.#getPaginationTokenUseCase = getPaginationTokenUseCase
    this.#deleteTokenUseCase = deleteTokenUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createTokenDto: TokenDtoCreate = req.body

    try {
      const createdToken = await this.#createTokenUseCase.execute(req.userContextService, createTokenDto)
      return res.status(HTTP_STATUS.CREATED).json(createdToken)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const tokenId = req.params.id
    const updateTokenDto: TokenDtoUpdate = req.body

    try {
      const updatedToken = await this.#updateTokenUseCase.execute(req.userContextService, tokenId, updateTokenDto)
      return res.status(HTTP_STATUS.OK).json(updatedToken)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const tokenId = req.params.id

    try {
      const token = await this.#findTokenByIdUseCase.execute(tokenId)
      if (!token) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(token)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = await this.#findAllTokensUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(tokens)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationTokenUseCase.execute(
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
    const tokenId = req.params.id

    try {
      await this.#deleteTokenUseCase.execute(tokenId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
