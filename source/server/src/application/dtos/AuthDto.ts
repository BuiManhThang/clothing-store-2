import { UserDtoView } from './UserDto'

export interface RegisterUserDto {
  email: string
  password: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface AuthResponseDto {
  user: UserDtoView
  accessToken: string
  refreshToken: string
}

export interface AuthContext {
  userId: string
  roleId: string
  roleCode: string
}
