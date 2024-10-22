import { Role } from '../../../domain/entities/Role'
import { CreateRoleDTO, ViewRoleDTO } from '../../dtos/RoleDTO'
import { IRoleRepo } from '../../../domain/interfaces/repositories/IRoleRepo'
import { RoleMapper } from '../../mappers/RoleMapper'
import { generateUUID } from '../../../shared/utils/commonUtil'
import { ValidateCondition } from '../../../shared/types'
import { ValidateAction, ValidateRuleType } from '../../../shared/enums'
import { validate } from '../../../shared/utils/validator'
import { BadRequestError } from '../../../shared/errors/BadRequestError'

const validateConditions: ValidateCondition<CreateRoleDTO>[] = [
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

  async execute(createRoleDto: CreateRoleDTO): Promise<ViewRoleDTO> {
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
      createdBy: '',
    }

    const newRole = await this.#roleRepo.create(role)

    return RoleMapper.toViewRoleDTO(newRole)
  }
}
