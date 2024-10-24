import { AuthResponseDto, LoginDto, RegisterUserDto } from '../dtos/AuthDto'

export interface IAuthService {
  login(loginDto: LoginDto): Promise<AuthResponseDto>
  register(registerUserDto: RegisterUserDto): Promise<AuthResponseDto>
  logout(refreshToken: string): Promise<void>
  refreshToken(refreshToken: string): Promise<AuthResponseDto>
}
