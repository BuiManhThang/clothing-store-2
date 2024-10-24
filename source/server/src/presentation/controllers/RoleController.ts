import { NextFunction, Request, Response } from 'express'
import { CreateRoleUseCase } from '../../application/use-cases/role/CreateRoleUseCase'
import { DeleteRoleUseCase } from '../../application/use-cases/role/DeleteRoleUseCase'
import { FindAllRolesUseCase } from '../../application/use-cases/role/FindAllRolesUseCase'
import { GetRolePaginationUseCase } from '../../application/use-cases/role/GetRolePaginationUseCase'
import { FindRoleByIdUseCase } from '../../application/use-cases/role/FindRoleByIdUseCase'
import { UpdateRoleUseCase } from '../../application/use-cases/role/UpdateRoleUseCase'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'
import { RoleDtoCreate, RoleDtoUpdate } from '../../application/dtos/RoleDto'

export class RoleController extends BaseController {
  readonly #createRoleUseCase: CreateRoleUseCase
  readonly #updateRoleUseCase: UpdateRoleUseCase
  readonly #findRoleByIdUseCase: FindRoleByIdUseCase
  readonly #findAllRolesUseCase: FindAllRolesUseCase
  readonly #getPaginationRoleUseCase: GetRolePaginationUseCase
  readonly #deleteRoleUseCase: DeleteRoleUseCase

  constructor(
    createRoleUseCase: CreateRoleUseCase,
    updateRoleUseCase: UpdateRoleUseCase,
    findRoleByIdUseCase: FindRoleByIdUseCase,
    findAllRolesUseCase: FindAllRolesUseCase,
    getPaginationRoleUseCase: GetRolePaginationUseCase,
    deleteRoleUseCase: DeleteRoleUseCase
  ) {
    super()
    this.#createRoleUseCase = createRoleUseCase
    this.#updateRoleUseCase = updateRoleUseCase
    this.#findRoleByIdUseCase = findRoleByIdUseCase
    this.#findAllRolesUseCase = findAllRolesUseCase
    this.#getPaginationRoleUseCase = getPaginationRoleUseCase
    this.#deleteRoleUseCase = deleteRoleUseCase
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const roleDtoCreate: RoleDtoCreate = req.body

    try {
      const createdRole = await this.#createRoleUseCase.execute(
        req.userContextService,
        roleDtoCreate
      )
      return res.status(HTTP_STATUS.CREATED).json(createdRole)
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const roleId = req.params.id
    const roleDtoUpdate: RoleDtoUpdate = req.body

    try {
      const updatedRole = await this.#updateRoleUseCase.execute(
        req.userContextService,
        roleId,
        roleDtoUpdate
      )
      return res.status(HTTP_STATUS.OK).json(updatedRole)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const roleId = req.params.id

    try {
      const role = await this.#findRoleByIdUseCase.execute(roleId)
      if (!role) {
        return res.sendStatus(HTTP_STATUS.NOT_FOUND)
      }

      return res.status(HTTP_STATUS.OK).json(role)
    } catch (error) {
      next(error)
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await this.#findAllRolesUseCase.execute()

      return res.status(HTTP_STATUS.OK).json(roles)
    } catch (error) {
      next(error)
    }
  }

  async getPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize.toString()) : undefined
      const pageIndex = req.query.pageIndex ? parseInt(req.query.pageIndex.toString()) : undefined
      const paginationResult = await this.#getPaginationRoleUseCase.execute(
        pageSize,
        pageIndex,
        req.query.sort?.toString(),
        req.query.sortDirection?.toString(),
        req.query.code?.toString(),
        req.query.name?.toString()
      )

      return res.status(HTTP_STATUS.OK).json(paginationResult)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const roleId = req.params.id

    try {
      await this.#deleteRoleUseCase.execute(roleId)

      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
