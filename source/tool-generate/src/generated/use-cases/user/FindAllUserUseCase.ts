import { ViewUserDTO } from '../../dtos/UserDTO'
import { IUserRepo } from '../../interfaces/repositories/IUserRepo'
import { UserMapper } from '../../mappers/UserMapper'

export class FindAllUserUseCase {
  readonly #userRepo: IUserRepo

  constructor(userService: IUserRepo) {
    this.#userRepo = userService
  }

  async execute(): Promise<ViewUserDTO[]> {
    const user = await this.#userRepo.findAll()
    return user.map((user) => UserMapper.toViewUserDTO(user))
  }
}
