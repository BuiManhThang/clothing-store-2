import { ErrorCode, ValidateAction, ValidateRuleType } from '../enums'

export type ValidateRule<T> = {
  type: ValidateRuleType
  conditionValue?: any
}

export type ValidateResult<T> = {
  fieldName: keyof T
  value: any
  message: string
  errorCode?: ErrorCode
}

export type ValidateCondition<T> = {
  fieldName: keyof T
  displayName?: string
  rules: ValidateRule<T>[]
  action?: ValidateAction[]
}
