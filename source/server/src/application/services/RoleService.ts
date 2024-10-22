import { Role } from '../../domain/entities/Role'
import { IRoleRepo } from '../../domain/interfaces/repositories/IRoleRepo'
import { IRoleService } from '../interfaces/services/IRoleService'
import { BaseCurdService } from './BaseCurdService'

export class RoleService extends BaseCurdService<Role> implements IRoleService {
  constructor(repo: IRoleRepo) {
    super(repo)
  }
}
