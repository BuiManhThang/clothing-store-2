export interface TokenDtoCreate {
  userId: string;
  expireDate: Date;
  refreshToken: string;
  device: string;
}

export interface TokenDtoUpdate {
  userId: string;
  expireDate: Date;
  refreshToken: string;
  device: string;
}

export interface TokenDtoView {
  userId: string;
  expireDate: Date;
  refreshToken: string;
  device: string;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
