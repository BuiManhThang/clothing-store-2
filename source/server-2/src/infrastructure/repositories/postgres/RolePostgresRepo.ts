import { Role } from '../../../domain/entities/Role'
import { IRoleRepo } from '../../../domain/interfaces/repositories/IRoleRepo'
import { BasePostgresRepo } from './BasePostgresRepo'

export class RolePostgresRepo extends BasePostgresRepo<Role> implements IRoleRepo {
  constructor() {
    super('roles')
  }

  async findByCode(code: string): Promise<Role | null> {
    const result = await this._query(`select * from "roles" where "code" = $1 limit 1`, [code])
    if (result.rows.length) return result.rows[0]
    return null
  }
}
