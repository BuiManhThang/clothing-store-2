import { UserDtoView } from '../../dtos/UserDto'
import { IUserRepo } from '../../../domain/interfaces/repositories/IUserRepo'
import { UserMapper } from '../../mappers/UserMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { User } from '../../../domain/entities/User'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetUserPaginationUseCase {
  readonly #userRepo: IUserRepo

  constructor(userRepo: IUserRepo) {
    this.#userRepo = userRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<UserDtoView>> {
    const filterObjects: FilterObject<User>[] = []

    const sortObjects: SortObject<User>[] = []
    const keysOfUser: (keyof User)[] = []
    const sortKey = sort as keyof User
    if (sort && keysOfUser.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<User> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#userRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<UserDtoView> = {
      items: paginationResult.items.map((user) => UserMapper.toUserDtoView(user)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
