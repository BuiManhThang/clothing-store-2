import { BaseEntity } from './BaseEntity'

export interface RoleDetail {
  screenCode: string
  actions: string[]
}

export interface Role extends BaseEntity {
  code: string
  name: string
  description: string
  roleDetails: RoleDetail[]
}
