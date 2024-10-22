import { Request } from 'express'
import { AuthContext } from '../../../application/dtos/AuthDto'

declare module 'express' {
  export interface Request {
    authContext?: AuthContext
  }
}
