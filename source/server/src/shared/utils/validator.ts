import { ErrorCode, ValidateRuleType } from '../enums'
import { ValidateCondition, ValidateResult } from '../types'

export const validate = <T>(
  data: T,
  conditionsArray: ValidateCondition<T>[]
): ValidateResult<T>[] => {
  const results: ValidateResult<T>[] = []

  for (const conditions of conditionsArray) {
    const value = data[conditions.fieldName] // Ép kiểu sang string
    let isValid = true
    let message = ''
    let errorCode: ErrorCode | undefined = undefined
    let displayName = conditions.displayName
      ? conditions.displayName
      : conditions.fieldName.toString()

    for (const rule of conditions.rules) {
      switch (rule.type) {
        case ValidateRuleType.Require:
          if (typeof value === 'string') {
            isValid = value !== ''
          } else if (Array.isArray(value)) {
            isValid = value.length > 0
          } else {
            isValid = value !== null && value !== undefined
          }
          message = isValid ? '' : `${displayName} is required.`
          errorCode = isValid ? ErrorCode.Require : undefined
          break

        case ValidateRuleType.Email:
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          isValid = emailRegex.test(`${value}`)
          message = isValid ? '' : `${displayName} must be a valid email.`
          errorCode = isValid ? ErrorCode.InvalidEmail : undefined
          break

        case ValidateRuleType.PhoneNumber:
          const phoneRegex = /^\+?[1-9]\d{1,14}$/
          isValid = phoneRegex.test(`${value}`)
          message = isValid ? '' : `${displayName} must be a valid phone number.`
          errorCode = isValid ? ErrorCode.InvalidPhoneNumber : undefined
          break

        case ValidateRuleType.Password:
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          isValid = passwordRegex.test(`${value}`)
          message = isValid
            ? ''
            : `${displayName} must be at least 8 characters long, include uppercase letters, lowercase letters, numbers, and special characters.`
          errorCode = isValid ? ErrorCode.InvalidPassword : undefined
          break

        case ValidateRuleType.MaxLength:
          isValid = `${value}`.length <= (rule.conditionValue as number)
          message = isValid
            ? ''
            : `${displayName} must not exceed ${rule.conditionValue} characters.`
          errorCode = isValid ? ErrorCode.MaxLength : undefined
          break

        default:
          isValid = true
      }

      // Nếu không hợp lệ, chuyển sang trường khác
      if (!isValid) {
        const result: ValidateResult<T> = {
          fieldName: conditions.fieldName,
          value: value,
          message: message,
          errorCode: errorCode,
        }

        results.push(result)
        // Nếu có hàm xác thực tùy chỉnh, gọi nó
        // if (rule.customValidateResult) {
        //   const customResult = rule.customValidateResult(result)
        //   results.push(customResult)
        // } else {
        //   results.push(result)
        // }
        break
      }
    }
  }

  return results
}
