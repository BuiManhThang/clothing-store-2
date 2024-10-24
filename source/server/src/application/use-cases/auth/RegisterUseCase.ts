import { RegisterUserDto } from '../../dtos/AuthDto'
import { IAuthService } from '../../interfaces/IAuthService'

export class RegisterUseCase {
  readonly #authService: IAuthService
  constructor(authService: IAuthService) {
    this.#authService = authService
  }

  async execute(registerUserDto: RegisterUserDto) {
    return await this.#authService.register(registerUserDto)
  }
}
