import { BaseEntity } from './BaseEntity'

export interface Role extends BaseEntity {
  roleDetails: any;
  code: string;
  name: string;
  description: string;
}