import { IUserRepo } from '../../application/interfaces/repositories/IUserRepo'
import { User } from '../../domain/entities/User'
import { BasePostgresRepo } from './BasePostgresRepo'

export class UserPostgresRepo extends BasePostgresRepo<User> implements IUserRepo {
  constructor() {
    super('users')
  }
}
