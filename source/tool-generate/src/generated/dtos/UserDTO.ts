export interface CreateUserDTO {
  roleId: string;
  avatarId: string;
  phoneNumber: string;
  status: string;
  code: string;
  fullName: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  roleId: string;
  avatarId: string;
  phoneNumber: string;
  status: string;
  code: string;
  fullName: string;
  email: string;
  password: string;
}

export interface ViewUserDTO {
  roleId: string;
  avatarId: string;
  phoneNumber: string;
  status: string;
  code: string;
  fullName: string;
  email: string;
  password: string;
}
