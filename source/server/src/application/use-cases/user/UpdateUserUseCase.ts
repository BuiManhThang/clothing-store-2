import { User } from '../../../domain/entities/User'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UserDtoUpdate, UserDtoView } from '../../dtos/UserDto'
import { IUserRepo } from '../../../domain/interfaces/repositories/IUserRepo'
import { UserMapper } from '../../mappers/UserMapper'
import { IUserContextService } from '../../interfaces/IUserContextService'

export class UpdateUserUseCase {
  readonly #userRepo: IUserRepo

  constructor(userRepo: IUserRepo) {
    this.#userRepo = userRepo
  }

  async execute(userContextService: IUserContextService | undefined, id: string, updateuserDto: UserDtoUpdate): Promise<UserDtoView | null> {
    const oldUser = await this.#userRepo.findById(id)
    if (!oldUser) throw new NotFoundError('')

    const user: User = {
      id: oldUser.id,
      roleId: updateuserDto.roleId,
      avatarId: updateuserDto.avatarId,
      phoneNumber: updateuserDto.phoneNumber,
      status: updateuserDto.status,
      code: updateuserDto.code,
      fullName: updateuserDto.fullName,
      email: updateuserDto.email,
      password: updateuserDto.password,
      createdAt: oldUser.createdAt,
      createdBy: oldUser.createdBy,
      modifiedAt: new Date(),
      modifiedBy: userContextService?.getCurrentUserId() || '',
    }

    const updatedUser = await this.#userRepo.update(id, user)

    if (updatedUser) return UserMapper.toUserDtoView(updatedUser)
    return null
  }
}
