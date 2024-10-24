import { NextFunction, Request, Response } from 'express'
import { LoginDto, RegisterUserDto } from '../../application/dtos/AuthDto'
import { RegisterUseCase } from '../../application/use-cases/auth/RegisterUseCase'
import { BaseController } from './BaseController'
import { HTTP_STATUS } from '../../shared/constants/httpStatus'
import { RefreshTokenUseCase } from '../../application/use-cases/auth/RefreshTokenUseCase'
import { LoginUseCase } from '../../application/use-cases/auth/LoginUseCase'
import { LogoutUseCase } from '../../application/use-cases/auth/LogoutUseCase'

export class AuthController extends BaseController {
  readonly #registerUseCase: RegisterUseCase
  readonly #loginUseCase: LoginUseCase
  readonly #refreshTokenUseCase: RefreshTokenUseCase
  readonly #logoutUseCase: LogoutUseCase

  constructor(
    registerUseCase: RegisterUseCase,
    loginUseCase: LoginUseCase,
    refreshTokenUseCase: RefreshTokenUseCase,
    logoutUseCase: LogoutUseCase
  ) {
    super()
    this.#registerUseCase = registerUseCase
    this.#loginUseCase = loginUseCase
    this.#refreshTokenUseCase = refreshTokenUseCase
    this.#logoutUseCase = logoutUseCase
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const registerUserDto: RegisterUserDto = req.body

    try {
      const authResponseDto = await this.#registerUseCase.execute(registerUserDto)
      return res.status(HTTP_STATUS.CREATED).json(authResponseDto)
    } catch (error) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const loginDto: LoginDto = req.body

    try {
      const authResponseDto = await this.#loginUseCase.execute(loginDto)
      return res.status(HTTP_STATUS.OK).json(authResponseDto)
    } catch (error) {
      next(error)
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body

    try {
      const authResponseDto = await this.#refreshTokenUseCase.execute(refreshToken)
      return res.status(HTTP_STATUS.OK).json(authResponseDto)
    } catch (error) {
      next(error)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body

    try {
      await this.#logoutUseCase.execute(refreshToken)
      return res.sendStatus(HTTP_STATUS.NO_CONTENT)
    } catch (error) {
      next(error)
    }
  }
}
