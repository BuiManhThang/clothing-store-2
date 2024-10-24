import { Role } from '../../../domain/entities/Role'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { RoleDtoUpdate, RoleDtoView } from '../../dtos/RoleDto'
import { IRoleRepo } from '../../../domain/interfaces/repositories/IRoleRepo'
import { RoleMapper } from '../../mappers/RoleMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateRoleUseCase {
  readonly #roleRepo: IRoleRepo

  constructor(roleRepo: IRoleRepo) {
    this.#roleRepo = roleRepo
  }

  async execute(
    userContextService: IUserContextService | undefined,
    id: string,
    roleDtoUpdate: RoleDtoUpdate
  ): Promise<RoleDtoView | null> {
    const oldRole = await this.#roleRepo.findById(id)
    if (!oldRole) throw new NotFoundError('')

    const role: Role = {
      id: oldRole.id,
      code: roleDtoUpdate.code,
      name: roleDtoUpdate.name,
      roleDetails: roleDtoUpdate.roleDetails,
      description: roleDtoUpdate.description,
      createdAt: oldRole.createdAt,
      createdBy: oldRole.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId(),
    }

    const updatedRole = await this.#roleRepo.update(id, role)

    if (updatedRole) return RoleMapper.toRoleDtoView(updatedRole)
    return null
  }
}
