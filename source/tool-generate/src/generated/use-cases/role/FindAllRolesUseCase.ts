import { ViewRoleDTO } from '../../dtos/RoleDTO'
import { IRoleRepo } from '../../interfaces/repositories/IRoleRepo'
import { RoleMapper } from '../../mappers/RoleMapper'

export class FindAllRolesUseCase {
  readonly #roleRepo: IRoleRepo

  constructor(roleService: IRoleRepo) {
    this.#roleRepo = roleService
  }

  async execute(): Promise<ViewRoleDTO[]> {
    const roles = await this.#roleRepo.findAll()
    return roles.map((role) => RoleMapper.toViewRoleDTO(role))
  }
}
