import { FileDtoView } from '../../dtos/FileDto'
import { IFileRepo } from '../../../domain/interfaces/repositories/IFileRepo'
import { FileMapper } from '../../mappers/FileMapper'
import {
  DbQueryBuilder,
  FilterObject,
  PaginationResult,
  SortObject,
} from '../../../shared/types/paginationType'
import { File } from '../../../domain/entities/File'
import { Condition, Operator, SortDirection } from '../../../shared/enums/paginationEnum'

export class GetFilePaginationUseCase {
  readonly #fileRepo: IFileRepo

  constructor(fileRepo: IFileRepo) {
    this.#fileRepo = fileRepo
  }

  async execute(
    pageSize?: number,
    pageIndex?: number,
    sort?: string,
    sortDirection?: string
  ): Promise<PaginationResult<FileDtoView>> {
    const filterObjects: FilterObject<File>[] = []

    const sortObjects: SortObject<File>[] = []
    const keysOfFile: (keyof File)[] = []
    const sortKey = sort as keyof File
    if (sort && keysOfFile.includes(sortKey)) {
      sortObjects.push({
        column: sortKey,
        direction:
          sortDirection?.toLocaleLowerCase() === SortDirection.Desc.toString().toLocaleLowerCase()
            ? SortDirection.Desc
            : SortDirection.Asc,
      })
    }

    const dbQueryBuilder: DbQueryBuilder<File> = {
      filterObjects,
      sortObjects,
      pageSize,
      pageIndex,
    }

    const paginationResult = await this.#fileRepo.getPagination(dbQueryBuilder)
    const formattedPaginationResult: PaginationResult<FileDtoView> = {
      items: paginationResult.items.map((file) => FileMapper.toFileDtoView(file)),
      total: paginationResult.total,
    }
    return formattedPaginationResult
  }
}
