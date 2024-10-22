import { ViewUserDTO } from './UserDTO'

export interface RegisterUserDTO {
  email: string
  password: string
}

export interface LoginDTO {
  email: string
  password: string
}

export interface AuthResponseDTO {
  user: ViewUserDTO
  accessToken: string
  refreshToken: string
}

export interface AuthContext {
  userId: string
  roleId: string
  roleCode: string
}
