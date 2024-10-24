import { User } from '../../../domain/entities/User'
import { UserDtoCreate, UserDtoView } from '../../dtos/UserDto'
import { IUserRepo } from '../../../domain/interfaces/repositories/IUserRepo'
import { UserMapper } from '../../mappers/UserMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class CreateUserUseCase {
  readonly #userRepo: IUserRepo

  constructor(userRepo: IUserRepo) {
    this.#userRepo = userRepo
  }

  async execute(userContextService: IUserContextService | undefined, createUserDto: UserDtoCreate): Promise<UserDtoView> {
    const user: User = {
      id: generateUUID(),
      roleId: createUserDto.roleId,
      avatarId: createUserDto.avatarId,
      phoneNumber: createUserDto.phoneNumber,
      status: createUserDto.status,
      code: createUserDto.code,
      fullName: createUserDto.fullName,
      email: createUserDto.email,
      password: createUserDto.password,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newUser = await this.#userRepo.create(user)

    return UserMapper.toUserDtoView(newUser)
  }
}
