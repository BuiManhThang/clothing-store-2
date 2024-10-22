import { IUserRepo } from '../../../domain/interfaces/repositories/IUserRepo'

export class DeleteUserUseCase {
  readonly #userRepo: IUserRepo

  constructor(userService: IUserRepo) {
    this.#userRepo = userService
  }

  async execute(id: string): Promise<boolean> {
    return await this.#userRepo.delete(id)
  }
}
