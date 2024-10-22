import { RoleController } from '../controllers/RoleController'
import { createRoleRouter } from './RoleRouter'
import { CreateRoleUseCase } from '../../application/use-cases/role/CreateRoleUseCase'
import { UpdateRoleUseCase } from '../../application/use-cases/role/UpdateRoleUseCase'
import { FindRoleByIdUseCase } from '../../application/use-cases/role/FindRoleByIdUseCase'
import { FindAllRolesUseCase } from '../../application/use-cases/role/FindAllRolesUseCase'
import { DeleteRoleUseCase } from '../../application/use-cases/role/DeleteRoleUseCase'
import { RolePostgresRepo } from '../../infrastructure/repositories/postgres/RolePostgresRepo'

const roleRepo = new RolePostgresRepo()
const createRoleUseCase = new CreateRoleUseCase(roleRepo)
const updateRoleUseCase = new UpdateRoleUseCase(roleRepo)
const findRoleByIdUseCase = new FindRoleByIdUseCase(roleRepo)
const findAllRolesUseCase = new FindAllRolesUseCase(roleRepo)
const deleteRoleUseCase = new DeleteRoleUseCase(roleRepo)
const roleController = new RoleController(
  createRoleUseCase,
  updateRoleUseCase,
  findRoleByIdUseCase,
  findAllRolesUseCase,
  deleteRoleUseCase
)
export const roleRouter = createRoleRouter(roleController)
