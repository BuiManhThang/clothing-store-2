import { ViewRoleDTO } from '../../dtos/RoleDTO'
import { IRoleRepo } from '../../interfaces/repositories/IRoleRepo'
import { RoleMapper } from '../../mappers/RoleMapper'

export class FindAllRoleUseCase {
  readonly #roleRepo: IRoleRepo

  constructor(roleService: IRoleRepo) {
    this.#roleRepo = roleService
  }

  async execute(): Promise<ViewRoleDTO[]> {
    const role = await this.#roleRepo.findAll()
    return role.map((role) => RoleMapper.toViewRoleDTO(role))
  }
}
