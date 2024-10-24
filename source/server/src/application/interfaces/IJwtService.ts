export interface IJwtService {
  createAccessToken(userId: string, roleId: string, roleCode: string): string

  createRefreshToken(userId: string): string

  verifyAccessToken(token: string): any

  verifyRefreshToken(token: string): any
}
