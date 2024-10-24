import { Role } from '../../../domain/entities/Role'
import { RoleDtoCreate, RoleDtoView } from '../../dtos/RoleDto'
import { IRoleRepo } from '../../../domain/interfaces/repositories/IRoleRepo'
import { RoleMapper } from '../../mappers/RoleMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateRoleUseCase {
  readonly #roleRepo: IRoleRepo

  constructor(roleRepo: IRoleRepo) {
    this.#roleRepo = roleRepo
  }

  async execute(userContextService: IUserContextService | undefined, createRoleDto: RoleDtoCreate): Promise<RoleDtoView> {
    const role: Role = {
      id: generateUUID(),
      roleDetails: createRoleDto.roleDetails,
      code: createRoleDto.code,
      name: createRoleDto.name,
      description: createRoleDto.description,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newRole = await this.#roleRepo.create(role)

    return RoleMapper.toRoleDtoView(newRole)
  }
}
