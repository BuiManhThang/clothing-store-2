export interface RoleDtoCreate {
  roleDetails: any;
  code: string;
  name: string;
  description: string;
}

export interface RoleDtoUpdate {
  roleDetails: any;
  code: string;
  name: string;
  description: string;
}

export interface RoleDtoView {
  roleDetails: any;
  code: string;
  name: string;
  description: string;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
