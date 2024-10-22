import { IRoleRepo } from '../../application/interfaces/repositories/IRoleRepo'
import { Role } from '../../domain/entities/Role'
import { BasePostgresRepo } from './BasePostgresRepo'

export class RolePostgresRepo extends BasePostgresRepo<Role> implements IRoleRepo {
  constructor() {
    super('roles')
  }
}
