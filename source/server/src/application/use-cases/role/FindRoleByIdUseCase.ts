import { RoleDtoView } from '../../dtos/RoleDTO'
import { IRoleRepo } from '../../../domain/interfaces/repositories/IRoleRepo'
import { RoleMapper } from '../../mappers/RoleMapper'

export class FindRoleByIdUseCase {
  readonly #roleRepo: IRoleRepo

  constructor(roleRepo: IRoleRepo) {
    this.#roleRepo = roleRepo
  }

  async execute(id: string): Promise<RoleDtoView | null> {
    const role = await this.#roleRepo.findById(id)
    if (!role) return null
    return RoleMapper.toRoleDtoView(role)
  }
}
