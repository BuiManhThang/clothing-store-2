import { RoleDetailAction } from '@/shared/enums/roleDetailAction'
import { BaseEntity } from './BaseEntity'

export interface RoleDetail {
  screen: string
  actions: RoleDetailAction[]
}

export interface RoleEntity extends BaseEntity {
  code: string
  name: string
  description: string
  roleDetails: RoleDetail[]
}
