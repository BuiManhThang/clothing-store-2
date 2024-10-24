import { RoleDtoView } from '../../dtos/RoleDto'
import { IRoleRepo } from '../../../domain/interfaces/repositories/IRoleRepo'
import { RoleMapper } from '../../mappers/RoleMapper'

export class FindAllRolesUseCase {
  readonly #roleRepo: IRoleRepo

  constructor(roleService: IRoleRepo) {
    this.#roleRepo = roleService
  }

  async execute(): Promise<RoleDtoView[]> {
    const roles = await this.#roleRepo.findAll()
    return roles.map((role) => RoleMapper.toRoleDtoView(role))
  }
}
