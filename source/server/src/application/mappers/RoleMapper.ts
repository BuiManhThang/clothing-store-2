import { Role } from '../../domain/entities/Role'
import { RoleDtoView } from '../dtos/RoleDto'

export class RoleMapper {
  static toRoleDtoView(role: Role): RoleDtoView {
    return {
      id: role.id,
      code: role.code,
      name: role.name,
      description: role.description,
      roleDetails: role.roleDetails,
      createdAt: role.createdAt,
      createdBy: role.createdBy,
      modifiedAt: role.modifiedAt,
      modifiedBy: role.modifiedBy,
    }
  }
}
