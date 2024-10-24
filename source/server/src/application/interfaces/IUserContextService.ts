export interface IUserContextService {
  getCurrentUserId(): string | undefined
  getCurrentUserRoleId(): string | undefined
  getCurrentUserRoleCode(): string | undefined
}
