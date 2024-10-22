import { Condition, FilterDataType, Operator, SortDirection } from '../enums/paginationEnum'

export type FilterObject<T> = {
  operator?: Operator
  filterObjects?: FilterObject<T>[]
  column?: keyof T
  value?: any
  condition?: Condition
  dataType?: FilterDataType
}

export type SortObject<T> = {
  column: keyof T
  direction: SortDirection
}

export type DbQueryBuilder<T> = {
  columns?: (keyof T)[]
  filterObjects?: FilterObject<T>[]
  sortObjects?: SortObject<T>[]
  pageIndex?: number
  pageSize?: number
  getTableName?: (values: any[]) => string
}

export type PaginationResult<T> = {
  items: T[]
  total: number
}
