import { Role } from '../../domain/entities/Role'
import { RoleDtoView } from '../dtos/RoleDto'

export class RoleMapper {
  static toRoleDtoView(role: Role): RoleDtoView {
    return role
  }
}
