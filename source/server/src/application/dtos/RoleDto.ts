import { RoleDetail } from '../../domain/entities/Role'

export interface RoleDtoCreate {
  code: string
  name: string
  description: string
  roleDetails: RoleDetail[]
}

export interface RoleDtoUpdate {
  code: string
  name: string
  description: string
  roleDetails: RoleDetail[]
}

export interface RoleDtoView {
  id: string
  code: string
  name: string
  description: string
  roleDetails: RoleDetail[]
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
