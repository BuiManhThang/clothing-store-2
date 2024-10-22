import { v4 as uuidv4 } from 'uuid'

export const generateUUID = () => {
  return uuidv4()
}

export const incrementCode = (prefix: string, code?: string | null) => {
  if (!code) {
    return `${prefix}.00000`
  }

  // Tách phần chữ và phần số
  const parts = code.split('.')
  prefix = parts[0] // Lấy phần chữ (U)
  let number = parseInt(parts[1], 10) // Chuyển phần số sang số nguyên

  // Tăng số lên 1
  number += 1

  // Đảm bảo phần số luôn có 5 chữ số
  const newNumber = number.toString().padStart(5, '0')

  // Trả về mã mới
  return `${prefix}.${newNumber}`
}
