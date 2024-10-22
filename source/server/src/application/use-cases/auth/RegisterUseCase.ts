import { RegisterUserDTO } from '../../dtos/AuthDto'
import { IAuthService } from '../../interfaces/services/IAuthService'

export class RegisterUseCase {
  readonly #authService: IAuthService
  constructor(authService: IAuthService) {
    this.#authService = authService
  }

  async execute(registerUserDto: RegisterUserDTO) {
    return await this.#authService.register(registerUserDto)
  }
}
