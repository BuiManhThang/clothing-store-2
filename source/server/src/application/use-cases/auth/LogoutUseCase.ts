import { IAuthService } from '../../interfaces/IAuthService'

export class LogoutUseCase {
  readonly #authService: IAuthService
  constructor(authService: IAuthService) {
    this.#authService = authService
  }

  async execute(refreshToken: string) {
    return await this.#authService.logout(refreshToken)
  }
}
