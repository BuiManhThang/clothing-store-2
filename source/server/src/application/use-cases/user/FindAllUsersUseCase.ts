import { ViewUserDTO } from '../../dtos/UserDTO'
import { IUserRepo } from '../../../domain/interfaces/repositories/IUserRepo'
import { UserMapper } from '../../mappers/UserMapper'

export class FindAllUsersUseCase {
  readonly #userRepo: IUserRepo

  constructor(userService: IUserRepo) {
    this.#userRepo = userService
  }

  async execute(): Promise<ViewUserDTO[]> {
    const users = await this.#userRepo.findAll()
    return users.map((user) => UserMapper.toViewUserDTO(user))
  }
}
