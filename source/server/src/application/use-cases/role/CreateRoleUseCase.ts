import { Role } from '../../../domain/entities/Role'
import { RoleDtoCreate, RoleDtoView } from '../../dtos/RoleDTO'
import { IRoleRepo } from '../../../domain/interfaces/repositories/IRoleRepo'
import { RoleMapper } from '../../mappers/RoleMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { ValidateCondition } from '../../../shared/types'
import { ValidateAction, ValidateRuleType } from '../../../shared/enums'
import { validate } from '../../../shared/utils/validator'
import { BadRequestError } from '../../../shared/errors/BadRequestError'

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

  async execute(createRoleDto: RoleDtoCreate, createdBy: string): Promise<RoleDtoView> {
    const validateResult = validate(createRoleDto, validateConditions)
    if (validateResult.length) {
      throw new BadRequestError('', validateResult)
    }

    const role: Role = {
      id: generateUUID(),
      code: createRoleDto.code,
      name: createRoleDto.name,
      roleDetails: createRoleDto.roleDetails,
      description: createRoleDto.description,
      createdAt: new Date(),
      createdBy: createdBy,
    }

    const newRole = await this.#roleRepo.create(role)

    return RoleMapper.toRoleDtoView(newRole)
  }
}
