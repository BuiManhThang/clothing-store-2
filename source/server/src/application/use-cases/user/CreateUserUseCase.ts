import { User } from '../../../domain/entities/User'
import { CreateUserDTO, ViewUserDTO } from '../../dtos/UserDTO'
import { IUserRepo } from '../../../domain/interfaces/repositories/IUserRepo'
import { UserMapper } from '../../mappers/UserMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'

export class CreateUserUseCase {
  readonly #userRepo: IUserRepo

  constructor(userRepo: IUserRepo) {
    this.#userRepo = userRepo
  }

  async execute(createUserDto: CreateUserDTO): Promise<ViewUserDTO> {
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
      createdBy: '',
    }

    const newUser = await this.#userRepo.create(user)

    return UserMapper.toViewUserDTO(newUser)
  }
}
