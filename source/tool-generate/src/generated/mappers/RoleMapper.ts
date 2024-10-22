import { Role } from '../../domain/entities/Role'
import { ViewRoleDTO } from '../dtos/RoleDTO'

export class RoleMapper {
  static toViewRoleDTO(role: Role): ViewRoleDTO {
    return role
  }
}
