import { User } from '../../domain/entities/User'
import { ViewUserDTO } from '../dtos/UserDTO'

export class UserMapper {
  static toViewUserDTO(user: User): ViewUserDTO {
    return {
      id: user.id,
      code: user.code,
      fullName: user.fullName,
      email: user.email,
      avatarId: user.avatarId,
      phoneNumber: user.phoneNumber,
      roleId: user.roleId,
      status: user.status,
      createdAt: user.createdAt,
      createdBy: user.createdBy,
      modifiedAt: user.modifiedAt,
      modifiedBy: user.modifiedBy,
    }
  }
}
