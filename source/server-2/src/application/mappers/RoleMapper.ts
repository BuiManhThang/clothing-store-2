import { Role } from '../../domain/entities/Role'
import { ViewRoleDTO } from '../dtos/RoleDTO'

export class RoleMapper {
  static toViewRoleDTO(role: Role): ViewRoleDTO {
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
