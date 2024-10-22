import { Order } from '../../entities/Order'
import { IBaseRepo } from './IBaseRepo'

export interface IOrderRepo extends IBaseRepo<Order> {}
