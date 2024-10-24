import { Role } from '../../../domain/entities/Role'
import { RoleDtoCreate, RoleDtoView } from '../../dtos/RoleDto'
import { IRoleRepo } from '../../../domain/interfaces/repositories/IRoleRepo'
import { RoleMapper } from '../../mappers/RoleMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { ValidateCondition } from '../../../shared/types'
import { ValidateAction, ValidateRuleType } from '../../../shared/enums'
import { validate } from '../../../shared/utils/validator'
import { BadRequestError } from '../../../shared/errors/BadRequestError'
import { IUserContextService } from '../../interfaces/IUserContextService'

const validateConditions: ValidateCondition<RoleDtoCreate>[] = [
  {
    action: [ValidateAction.Create],
    fieldName: 'code',
    rules: [
      {
        type: ValidateRuleType.Require,
      },
    ],
  },
  {
    action: [ValidateAction.Create],
    fieldName: 'name',
    rules: [
      {
        type: ValidateRuleType.Require,
      },
    ],
  },
  {
    action: [ValidateAction.Create],
    fieldName: 'roleDetails',
    rules: [
      {
        type: ValidateRuleType.Require,
      },
    ],
  },
]

export class CreateRoleUseCase {
  readonly #roleRepo: IRoleRepo

  constructor(roleRepo: IRoleRepo) {
    this.#roleRepo = roleRepo
  }

  async execute(
    userContextService: IUserContextService | undefined,
    roleDtoCreate: RoleDtoCreate
  ): Promise<RoleDtoView> {
    const validateResult = validate(roleDtoCreate, validateConditions)
    if (validateResult.length) {
      throw new BadRequestError('', validateResult)
    }

    const role: Role = {
      id: generateUUID(),
      code: roleDtoCreate.code,
      name: roleDtoCreate.name,
      roleDetails: roleDtoCreate.roleDetails,
      description: roleDtoCreate.description,
      createdAt: new Date(),
      createdBy: userContextService?.getCurrentUserId() || '',
    }

    const newRole = await this.#roleRepo.create(role)

    return RoleMapper.toRoleDtoView(newRole)
  }
}
