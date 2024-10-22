import { Role } from '../../entities/Role'
import { IBaseRepo } from './IBaseRepo'

export interface IRoleRepo extends IBaseRepo<Role> {
  findByCode(code: string): Promise<Role | null>
}
