import { UserStatus } from '../../shared/enums'

export interface UserDtoCreate {
  roleId: string
  avatarId?: string
  phoneNumber: string
  status: UserStatus
  code: string
  fullName: string
  email: string
  password: string
}

export interface UserDtoUpdate {
  roleId: string
  avatarId?: string
  phoneNumber: string
  status: UserStatus
  code: string
  fullName: string
  email: string
  password: string
}

export interface UserDtoView {
  roleId: string
  avatarId?: string
  phoneNumber: string
  status: UserStatus
  code: string
  fullName: string
  email: string
  password: string
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
