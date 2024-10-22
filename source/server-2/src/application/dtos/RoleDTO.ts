import { RoleDetail } from '../../domain/entities/Role'

export interface CreateRoleDTO {
  code: string
  name: string
  description: string
  roleDetails: RoleDetail[]
}

export interface UpdateRoleDTO {
  code: string
  name: string
  description: string
  roleDetails: RoleDetail[]
}

export interface ViewRoleDTO {
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
