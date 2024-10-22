import { LoginDTO } from '../../dtos/AuthDto'
import { IAuthService } from '../../interfaces/services/IAuthService'

export class LoginUseCase {
  readonly #authService: IAuthService
  constructor(authService: IAuthService) {
    this.#authService = authService
  }

  async execute(loginDto: LoginDTO) {
    return await this.#authService.login(loginDto)
  }
}
