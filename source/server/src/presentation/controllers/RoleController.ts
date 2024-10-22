import { Request, Response } from 'express'
import { CreateRoleUseCase } from '../../application/use-cases/role/CreateRoleUseCase'
import { DeleteRoleUseCase } from '../../application/use-cases/role/DeleteRoleUseCase'
import { FindAllRolesUseCase } from '../../application/use-cases/role/FindAllRolesUseCase'
import { FindRoleByIdUseCase } from '../../application/use-cases/role/FindRoleByIdUseCase'
import { UpdateRoleUseCase } from '../../application/use-cases/role/UpdateRoleUseCase'
import { RoleDtoCreate, RoleDtoUpdate } from '../../application/dtos/RoleDto'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'

export class RoleController extends BaseController {
  readonly #createRoleUseCase: CreateRoleUseCase
  readonly #updateRoleUseCase: UpdateRoleUseCase
  readonly #findRoleByIdUseCase: FindRoleByIdUseCase
  readonly #findAllRolesUseCase: FindAllRolesUseCase
  readonly #deleteRoleUseCase: DeleteRoleUseCase

  constructor(
    createRoleUseCase: CreateRoleUseCase,
    updateRoleUseCase: UpdateRoleUseCase,
    findRoleByIdUseCase: FindRoleByIdUseCase,
    findAllRolesUseCase: FindAllRolesUseCase,
    deleteRoleUseCase: DeleteRoleUseCase
  ) {
    super()
    this.#createRoleUseCase = createRoleUseCase
    this.#updateRoleUseCase = updateRoleUseCase
    this.#findRoleByIdUseCase = findRoleByIdUseCase
    this.#findAllRolesUseCase = findAllRolesUseCase
    this.#deleteRoleUseCase = deleteRoleUseCase
  }

  async create(req: Request, res: Response) {
    const createRoleDTO: RoleDtoCreate = req.body

    try {
      const createdRole = await this.#createRoleUseCase.execute(createRoleDTO)
      return res.status(HTTP_STATUS.CREATED).json(createdRole)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async update(req: Request, res: Response) {
    const roleId = req.params.id
    const updateRoleDTO: RoleDtoUpdate = req.body

    try {
      const updatedRole = await this.#updateRoleUseCase.execute(roleId, updateRoleDTO)
      return res.status(HTTP_STATUS.OK).json(updatedRole)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findById(req: Request, res: Response) {
    const roleId = req.params.id

    try {
      const role = await this.#findRoleByIdUseCase.execute(roleId)
      if (!role) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(role)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async findAll(_req: Request, res: Response) {
    try {
      const roles = await this.#findAllRolesUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(roles)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }

  async delete(req: Request, res: Response) {
    const roleId = req.params.id

    try {
      await this.#deleteRoleUseCase.execute(roleId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      return this.handleAppError(error, res)
    }
  }
}
