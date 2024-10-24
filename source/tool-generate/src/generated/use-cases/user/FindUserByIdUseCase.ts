import { UserDtoView } from '../../dtos/UserDto'
import { IUserRepo } from '../../../domain/interfaces/repositories/IUserRepo'
import { UserMapper } from '../../mappers/UserMapper'

export class FindUserByIdUseCase {
  readonly #userRepo: IUserRepo

  constructor(userRepo: IUserRepo) {
    this.#userRepo = userRepo
  }

  async execute(id: string): Promise<UserDtoView | null> {
    const user = await this.#userRepo.findById(id)
    if (!user) return null
    return UserMapper.toUserDtoView(user)
  }
}
