import { Role } from '../../../domain/entities/Role'
import { CreateRoleDTO, ViewRoleDTO } from '../../dtos/RoleDTO'
import { IRoleRepo } from '../../interfaces/repositories/IRoleRepo'
import { RoleMapper } from '../../mappers/RoleMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateRoleUseCase {
  readonly #roleRepo: IRoleRepo

  constructor(roleRepo: IRoleRepo) {
    this.#roleRepo = roleRepo
  }

  async execute(createRoleDto: CreateRoleDTO): Promise<ViewRoleDTO> {
    const role: Role = {
      id: generateUUID(),
      roleDetails: createRoleDto.roleDetails,
      code: createRoleDto.code,
      name: createRoleDto.name,
      description: createRoleDto.description,
      createdAt: new Date(),
      createdBy: '',
    }

    const newRole = await this.#roleRepo.create(role)

    return RoleMapper.toViewRoleDTO(newRole)
  }
}
