import { User } from '../../../domain/entities/User'
import { NotFoundError } from '../../../shared/errors/NotFoundError'
import { UpdateUserDTO, ViewUserDTO } from '../../dtos/UserDTO'
import { IUserRepo } from '../../../domain/interfaces/repositories/IUserRepo'
import { UserMapper } from '../../mappers/UserMapper'

export class UpdateUserUseCase {
  readonly #userRepo: IUserRepo

  constructor(userRepo: IUserRepo) {
    this.#userRepo = userRepo
  }

  async execute(id: string, updateuserDTO: UpdateUserDTO): Promise<ViewUserDTO | null> {
    const oldUser = await this.#userRepo.findById(id)
    if (!oldUser) throw new NotFoundError('')

    const user: User = {
      id: oldUser.id,
      roleId: updateuserDTO.roleId,
      avatarId: updateuserDTO.avatarId,
      phoneNumber: updateuserDTO.phoneNumber,
      status: updateuserDTO.status,
      code: updateuserDTO.code,
      fullName: updateuserDTO.fullName,
      email: updateuserDTO.email,
      password: updateuserDTO.password,
      createdAt: oldUser.createdAt,
      createdBy: oldUser.createdBy,
      modifiedAt: new Date(),
      modifiedBy: '',
    }

    const updatedUser = await this.#userRepo.update(id, user)

    if (updatedUser) return UserMapper.toViewUserDTO(updatedUser)
    return null
  }
}
