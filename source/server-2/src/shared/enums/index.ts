export enum ValidateRuleType {
  Require = 'Require',
  Email = 'Email',
  PhoneNumber = 'PhoneNumber',
  Password = 'Password',
  MaxLength = 'MaxLength',
}

export enum ValidateAction {
  Create = 'Create',
  Update = 'Update',
}

export enum ErrorCode {
  ValidateError = 'ValidateError',
  Require = 'Require',
  InvalidEmail = 'InvalidEmail',
  InvalidPhoneNumber = 'InvalidPhoneNumber',
  InvalidPassword = 'InvalidPassword',
  WrongEmailOrPassword = 'WrongEmailOrPassword',
  EmailExisting = 'EmailExisting',
  EmailNotExisting = 'EmailNotExisting',
  MaxLength = 'MaxLength',
}

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}
