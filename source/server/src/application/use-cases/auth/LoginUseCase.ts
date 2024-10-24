import { LoginDto } from '../../dtos/AuthDto'
import { IAuthService } from '../../interfaces/IAuthService'

export class LoginUseCase {
  readonly #authService: IAuthService
  constructor(authService: IAuthService) {
    this.#authService = authService
  }

  async execute(loginDto: LoginDto) {
    return await this.#authService.login(loginDto)
  }
}
