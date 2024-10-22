export interface BaseEntity {
  id: string
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
