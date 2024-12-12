import { RoleEntity } from '@/domain/entities/RoleEntity'
import { IBaseRepository } from './IBaseRepository'

export interface IRoleRepository extends IBaseRepository<RoleEntity> {}
