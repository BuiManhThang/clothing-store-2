import { BaseEntity } from './BaseEntity'

export interface User extends BaseEntity {
  roleId: string;
  avatarId: string;
  phoneNumber: string;
  status: string;
  code: string;
  fullName: string;
  email: string;
  password: string;
}