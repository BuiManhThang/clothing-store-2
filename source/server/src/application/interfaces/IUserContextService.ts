export interface IUserContextService {
  getCurrentUserId(): string | null
  getCurrentUserRoleId(): string | null
  getCurrentUserRoleCode(): string | null
}
