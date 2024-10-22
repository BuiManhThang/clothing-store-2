import { Request, Response } from 'express'
import { CreateUserUseCase } from '../../application/use-cases/user/CreateUserUseCase'
import { DeleteUserUseCase } from '../../application/use-cases/user/DeleteUserUseCase'
import { FindAllUsersUseCase } from '../../application/use-cases/user/FindAllUsersUseCase'
import { FindUserByIdUseCase } from '../../application/use-cases/user/FindUserByIdUseCase'
import { UpdateUserUseCase } from '../../application/use-cases/user/UpdateUserUseCase'
import { CreateUserDTO, UpdateUserDTO } from '../../application/dtos/UserDTO'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class UserController extends BaseController {
  readonly #createUserUseCase: CreateUserUseCase
  readonly #updateUserUseCase: UpdateUserUseCase
  readonly #findUserByIdUseCase: FindUserByIdUseCase
  readonly #findAllUsersUseCase: FindAllUsersUseCase
  readonly #deleteUserUseCase: DeleteUserUseCase

  constructor(
    createUserUseCase: CreateUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
    findUserByIdUseCase: FindUserByIdUseCase,
    findAllUsersUseCase: FindAllUsersUseCase,
    deleteUserUseCase: DeleteUserUseCase
  ) {
    super()
    this.#createUserUseCase = createUserUseCase
    this.#updateUserUseCase = updateUserUseCase
    this.#findUserByIdUseCase = findUserByIdUseCase
    this.#findAllUsersUseCase = findAllUsersUseCase
    this.#deleteUserUseCase = deleteUserUseCase
  }

  async create(req: Request, res: Response) {
    const createUserDTO: CreateUserDTO = req.body

    try {
      const createdUser = await this.#createUserUseCase.execute(createUserDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdUser)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const userId = req.params.id
    const updateUserDTO: UpdateUserDTO = req.body

    try {
      const updatedUser = await this.#updateUserUseCase.execute(userId, updateUserDTO)
      return res.status(HTTP_STATUS.OK).json(updatedUser)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const userId = req.params.id

    try {
      const user = await this.#findUserByIdUseCase.execute(userId)
      if (!user) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(user)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const users = await this.#findAllUsersUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(users)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const userId = req.params.id

    try {
      await this.#deleteUserUseCase.execute(userId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
