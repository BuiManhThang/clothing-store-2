import { Request } from 'express'
import { AuthContext } from '../../../application/dtos/AuthDto'
import { IUserContextService } from '../../../application/interfaces/IUserContextService'

declare module 'express' {
  export interface Request {
    authContext?: AuthContext
    userContextService?: IUserContextService
  }
}
