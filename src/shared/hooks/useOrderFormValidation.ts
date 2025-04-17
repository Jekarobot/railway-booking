import { useState, useCallback } from 'react'

export interface ValidationError {
  field: string
  message: string
}

export const useOrderFormValidation = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [wrongInput, setWrongInput] = useState<ValidationError[]>([])

  const validate = useCallback(
    ({
      first_name,
      last_name,
      patronymic,
      phone,
      email,
      payment_method,
    }: {
      first_name: string
      last_name: string
      patronymic: string
      phone: string
      email: string
      payment_method: string
    }) => {
      const isCyrillic = (value: string) => /^[А-Яа-яЁё-]+$/.test(value)
      const isValidPhone = (value: string) => /^\+?\d{10,15}$/.test(value.replace(/\s+/g, ''))
      const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      const isValidPaymentMethod = (value: string) => value === 'cash' || value === 'online'

      const errors: ValidationError[] = []

      if (!isCyrillic(first_name)) {
        errors.push({
          field: 'first_name',
          message: 'Имя должно содержать только кириллицу',
        })
      }

      if (!isCyrillic(last_name)) {
        errors.push({
          field: 'last_name',
          message: 'Фамилия должна содержать только кириллицу',
        })
      }

      if (!isCyrillic(patronymic)) {
        errors.push({
          field: 'patronymic',
          message: 'Отчество должно содержать только кириллицу',
        })
      }

      if (!isValidPhone(phone)) {
        errors.push({
          field: 'phone',
          message: 'Введите корректный номер телефона',
        })
      }

      if (!isValidEmail(email)) {
        errors.push({
          field: 'email',
          message: 'Введите корректный адрес электронной почты',
        })
      }

      if (!isValidPaymentMethod(payment_method)) {
        errors.push({
          field: 'payment_method',
          message: 'Выберите способ оплаты: "cash" или "online"',
        })
      }

      setWrongInput(errors)

      if (errors.length > 0) {
        setErrorMessage(errors[0].message)
        return false
      }

      setErrorMessage(null)
      return true
    },
    []
  )

  return { validate, errorMessage, wrongInput }
}
