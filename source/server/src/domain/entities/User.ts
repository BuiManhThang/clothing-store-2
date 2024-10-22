import { UserStatus } from '../../shared/enums'
import { BaseEntity } from './BaseEntity'

export interface User extends BaseEntity {
  roleId: string
  avatarId?: string
  phoneNumber: string
  status: UserStatus
  code: string
  fullName: string
  email: string
  password: string
}
