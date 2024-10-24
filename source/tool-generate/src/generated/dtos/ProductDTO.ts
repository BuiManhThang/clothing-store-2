export interface ProductDtoCreate {
  categoryId: string;
  avatarId: string;
  code: string;
  name: string;
  description: string;
  status: string;
}

export interface ProductDtoUpdate {
  categoryId: string;
  avatarId: string;
  code: string;
  name: string;
  description: string;
  status: string;
}

export interface ProductDtoView {
  categoryId: string;
  avatarId: string;
  code: string;
  name: string;
  description: string;
  status: string;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
