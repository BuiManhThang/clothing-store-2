import { BaseEntity } from './BaseEntity'

export interface File extends BaseEntity {
  name: string;
  status: string;
}