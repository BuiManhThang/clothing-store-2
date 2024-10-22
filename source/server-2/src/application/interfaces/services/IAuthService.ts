import { AuthResponseDTO, LoginDTO, RegisterUserDTO } from '../../dtos/AuthDto'

export interface IAuthService {
  login(loginDTO: LoginDTO): Promise<AuthResponseDTO>
  register(registerUserDTO: RegisterUserDTO): Promise<AuthResponseDTO>
  logout(refreshToken: string): Promise<void>
  refreshToken(refreshToken: string): Promise<AuthResponseDTO>
}
