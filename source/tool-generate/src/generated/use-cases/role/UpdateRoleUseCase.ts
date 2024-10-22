import { Role } from '../../../domain/entities/Role'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateRoleDTO, ViewRoleDTO } from '../../dtos/RoleDTO'
import { IRoleRepo } from '../../interfaces/repositories/IRoleRepo'
import { RoleMapper } from '../../mappers/RoleMapper'

export class UpdateRoleUseCase {
  readonly #roleRepo: IRoleRepo

  constructor(roleRepo: IRoleRepo) {
    this.#roleRepo = roleRepo
  }

  async execute(id: string, updateroleDTO: UpdateRoleDTO): Promise<ViewRoleDTO | null> {
    const oldRole = await this.#roleRepo.findById(id)
    if (!oldRole) throw new NotFoundError('')

    const role: Role = {
      id: oldRole.id,
      roleDetails: updateroleDTO.roleDetails,
      code: updateroleDTO.code,
      name: updateroleDTO.name,
      description: updateroleDTO.description,
      createdAt: oldRole.createdAt,
      createdBy: oldRole.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedRole = await this.#roleRepo.update(id, role)

    if (updatedRole) return RoleMapper.toViewRoleDTO(updatedRole)
    return null
  }
}
