import { IUserRepo } from '../../domain/interfaces/repositories/IUserRepo'
import { User } from '../../domain/entities/User'
import { BasePostgresRepo } from './BasePostgresRepo'

export class UserPostgresRepo extends BasePostgresRepo<User> implements IUserRepo {
  readonly #tableName: string
  constructor() {
    super('users')
    this.#tableName = 'users'
  }

  async findTheNewstUser(): Promise<User | null> {
    const query = `select * from "${this.#tableName}" order by "code" desc limit 1`

    const result = await this._query(query)
    if (result.rows.length) return result.rows[0]
    return null
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = `select * from "${this.#tableName}" where "email" = $1 limit 1`
    const values = [email]
    const result = await this._query(query, values)
    if (result.rows.length) return result.rows[0]
    return null
  }
}
