import { Request, Response, NextFunction } from 'express'
import { CreateUserUseCase } from '../../application/use-cases/user/CreateUserUseCase'
import { DeleteUserUseCase } from '../../application/use-cases/user/DeleteUserUseCase'
import { FindAllUsersUseCase } from '../../application/use-cases/user/FindAllUsersUseCase'
import { GetUserPaginationUseCase } from '../../application/use-cases/user/GetUserPaginationUseCase'
import { FindUserByIdUseCase } from '../../application/use-cases/user/FindUserByIdUseCase'
import { UpdateUserUseCase } from '../../application/use-cases/user/UpdateUserUseCase'
import { UserDtoCreate, UserDtoUpdate } from '../../application/dtos/UserDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class UserController extends BaseController {
  readonly #createUserUseCase: CreateUserUseCase
  readonly #updateUserUseCase: UpdateUserUseCase
  readonly #findUserByIdUseCase: FindUserByIdUseCase
  readonly #findAllUsersUseCase: FindAllUsersUseCase
  readonly #getPaginationUserUseCase: GetUserPaginationUseCase
  readonly #deleteUserUseCase: DeleteUserUseCase

  constructor(
    createUserUseCase: CreateUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
    findUserByIdUseCase: FindUserByIdUseCase,
    findAllUsersUseCase: FindAllUsersUseCase,
    getPaginationUserUseCase: GetUserPaginationUseCase,
    deleteUserUseCase: DeleteUserUseCase
  ) {
    super()
    this.#createUserUseCase = createUserUseCase
    this.#updateUserUseCase = updateUserUseCase
    this.#findUserByIdUseCase = findUserByIdUseCase
    this.#findAllUsersUseCase = findAllUsersUseCase
    this.#getPaginationUserUseCase = getPaginationUserUseCase
    this.#deleteUserUseCase = deleteUserUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createUserDto: UserDtoCreate = req.body

    try {
      const createdUser = await this.#createUserUseCase.execute(req.userContextService, createUserDto)
      return res.status(HTTP_STATUS.CREATED).json(createdUser)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id
    const updateUserDto: UserDtoUpdate = req.body

    try {
      const updatedUser = await this.#updateUserUseCase.execute(req.userContextService, userId, updateUserDto)
      return res.status(HTTP_STATUS.OK).json(updatedUser)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id

    try {
      const user = await this.#findUserByIdUseCase.execute(userId)
      if (!user) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(user)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.#findAllUsersUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(users)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationUserUseCase.execute(
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
    const userId = req.params.id

    try {
      await this.#deleteUserUseCase.execute(userId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
