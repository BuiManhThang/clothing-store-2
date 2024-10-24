import { IAuthService } from '../../interfaces/services/IAuthService'

export class RefreshTokenUseCase {
  readonly #authService: IAuthService
  constructor(authService: IAuthService) {
    this.#authService = authService
  }

  async execute(refreshToken: string) {
    return await this.#authService.refreshToken(refreshToken)
  }
}
