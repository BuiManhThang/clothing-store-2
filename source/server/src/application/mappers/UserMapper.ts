import { User } from '../../domain/entities/User'
import { UserDtoView } from '../dtos/UserDto'

export class UserMapper {
  static toUserDtoView(user: User): UserDtoView {
    return user
  }
}
