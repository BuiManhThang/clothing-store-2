import { User } from '../../domain/entities/User'
import { ViewUserDTO } from '../dtos/UserDTO'

export class UserMapper {
  static toViewUserDTO(user: User): ViewUserDTO {
    return user
  }
}
