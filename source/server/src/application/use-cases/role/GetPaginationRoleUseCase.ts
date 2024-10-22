import { RoleDtoView } from '../../dtos/RoleDTO'
import { IRoleRepo } from '../../../domain/interfaces/repositories/IRoleRepo'
import { RoleMapper } from '../../mappers/RoleMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { Role } from '../../../domain/entities/Role'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetPaginationRoleUseCase {
  readonly #roleRepo: IRoleRepo

  constructor(roleRepo: IRoleRepo) {
    this.#roleRepo = roleRepo
  }

  async execute(
    pageSize: number,
    pageIndex: number,
    sort?: string,
    sortDirection?: 'desc' | 'asc',
    code?: string,
    name?: string
  ): Promise<PaginationResult<RoleDtoView>> {
    const filterObjects: FilterObject<Role>[] = []
    if (code) {
      filterObjects.push({
        column: 'code',
        operator: Operator.Contains,
        value: code,
        condition: Condition.Or,
      })
    }
    if (name) {
      filterObjects.push({
        column: 'name',
        operator: Operator.Contains,
        value: name,
        condition: Condition.Or,
      })
    }

    const sortObjects: SortObject<Role>[] = []
    if (sort && sort in ({} as Role)) {
      sortObjects.push({
        column: sort as keyof Role,
        direction: sortDirection === 'desc' ? SortDirection.Desc : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<Role> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#roleRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<RoleDtoView> = {
      items: paginationResult.items.map((role) => RoleMapper.toRoleDtoView(role)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
