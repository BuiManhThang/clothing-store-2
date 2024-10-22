import { RoleDtoView } from '../../dtos/RoleDTO'
import { IRoleRepo } from '../../../domain/interfaces/repositories/IRoleRepo'
import { RoleMapper } from '../../mappers/RoleMapper'

export class FindAllRolesUseCase {
  readonly #roleRepo: IRoleRepo

  constructor(roleRepo: IRoleRepo) {
    this.#roleRepo = roleRepo
  }

  async execute(): Promise<RoleDtoView[]> {
    const roles = await this.#roleRepo.findAll()
    return roles.map((role) => RoleMapper.toRoleDtoView(role))
  }
}
