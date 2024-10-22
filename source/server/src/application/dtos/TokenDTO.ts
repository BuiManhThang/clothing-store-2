export interface CreateTokenDTO {
  userId: string;
  expireDate: Date;
  refreshToken: string;
  device: string;
}

export interface UpdateTokenDTO {
  userId: string;
  expireDate: Date;
  refreshToken: string;
  device: string;
}

export interface ViewTokenDTO {
  userId: string;
  expireDate: Date;
  refreshToken: string;
  device: string;
}
