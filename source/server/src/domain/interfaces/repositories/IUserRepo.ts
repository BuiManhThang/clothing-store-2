import { User } from '../../entities/User'
import { IBaseRepo } from './IBaseRepo'

export interface IUserRepo extends IBaseRepo<User> {
  findByEmail(email: string): Promise<User | null>
  findTheNewstUser(): Promise<User | null>
}
