import { useState, useCallback } from 'react'

export interface ValidationError {
  field: string
  message: string
}

export const usePassengerValidation = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [wrongInput, setWrongInput] = useState<ValidationError[]>([])

  const validate = useCallback(
    ({
      lastName,
      firstName,
      patronymic,
      birthday,
      passportSeries,
      passportNumber,
      birthCertificate,
      isSelectedPassport,
    }: {
      lastName: string
      firstName: string
      patronymic: string
      birthday: string
      passportSeries: string
      passportNumber: string
      birthCertificate: string
      isSelectedPassport: boolean
    }) => {
      const isCyrillic = (value: string) => /^[А-Яа-яЁё-]+$/.test(value)
      const isValidPassportSeries = (value: string) => /^\d{4}$/.test(value)
      const isValidPassportNumber = (value: string) => /^\d{6}$/.test(value)
      const isValidBirthCertificate = (value: string) =>
        /^[IVXLCDM]{1,2}[А-ЯЁ]{2}\d{6}$/i.test(value)

      const errors: ValidationError[] = []

      // Validate last name
      if (!isCyrillic(lastName)) {
        errors.push({ field: 'lastName', message: 'Фамилия должна содержать только кирилицу' })
      }

      // Validate first name
      if (!isCyrillic(firstName)) {
        errors.push({ field: 'firstName', message: 'Имя должно содержать только кирилицу' })
      }

      // Validate patronymic
      if (!isCyrillic(patronymic)) {
        errors.push({ field: 'patronymic', message: 'Отчество должно содержать только кирилицу' })
      }

      // Validate birthday
      if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
        errors.push({
          field: 'birthday',
          message: 'Дата рождения должна быть в формате YYYY-MM-DD',
        })
      }

      // Validate documents
      if (isSelectedPassport) {
        if (!isValidPassportSeries(passportSeries)) {
          errors.push({
            field: 'passportSeries',
            message: 'Серия паспорта должна содержать 4 цифры',
          })
        }
        if (!isValidPassportNumber(passportNumber)) {
          errors.push({
            field: 'passportNumber',
            message: 'Номер паспорта должен содержать 6 цифр',
          })
        }
      } else {
        if (!isValidBirthCertificate(birthCertificate)) {
          errors.push({
            field: 'birthCertificate',
            message: 'Некорректный номер свидетельства о рождении. Пример: IVЮА123456',
          })
        }
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
