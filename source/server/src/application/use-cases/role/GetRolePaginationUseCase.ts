import { RoleDtoView } from '../../dtos/RoleDto'
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

export class GetRolePaginationUseCase {
  readonly #roleRepo: IRoleRepo

  constructor(roleRepo: IRoleRepo) {
    this.#roleRepo = roleRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string,
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
    const keysOfRole: (keyof Role)[] = ['code', 'name', 'id', 'createdAt', 'modifiedAt']
    const sortKey = sort as keyof Role
    if (sort && keysOfRole.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
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
