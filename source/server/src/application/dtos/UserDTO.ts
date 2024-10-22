import { UserStatus } from '../../shared/enums'

export interface CreateUserDTO {
  roleId: string
  avatarId?: string
  phoneNumber: string
  status: UserStatus
  code: string
  fullName: string
  email: string
  password: string
}

export interface UpdateUserDTO {
  roleId: string
  avatarId?: string
  phoneNumber: string
  status: UserStatus
  code: string
  fullName: string
  email: string
  password: string
}

export interface ViewUserDTO {
  id: string
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
  roleId: string
  avatarId?: string
  phoneNumber: string
  status: UserStatus
  code: string
  fullName: string
  email: string
}
