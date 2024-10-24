export interface FileDtoCreate {
  name: string;
  status: string;
}

export interface FileDtoUpdate {
  name: string;
  status: string;
}

export interface FileDtoView {
  name: string;
  status: string;
  createdAt: Date
  createdBy: string
  modifiedAt?: Date
  modifiedBy?: string
}
