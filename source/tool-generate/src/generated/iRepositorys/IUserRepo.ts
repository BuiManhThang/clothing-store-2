import { User } from '../../../domain/entities/User'
import { IBaseRepo } from './IBaseRepo'

export interface IUserRepo extends IBaseRepo<User> {}
