import React from 'react'
import styles from './PhoneAndEmailInput.module.css'
import { ValidationError } from '../../../shared/hooks/usePassengerValidation'

interface PhoneAndEmailInputProps {
  phone: string
  email: string
  onPhoneChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  wrongInput: ValidationError[]
}

const PhoneAndEmailInput: React.FC<PhoneAndEmailInputProps> = ({
  phone,
  email,
  onPhoneChange,
  onEmailChange,
  wrongInput,
}) => {
  const phoneHasError = wrongInput.some((error) => error.field === 'phone')
  const emailHasError = wrongInput.some((error) => error.field === 'email')

  const addCountryCode = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.target.value.startsWith('+7')) {
      onPhoneChange({
        ...event,
        target: { ...event.target, value: '+7' + event.target.value.replace(/^\+?7?/, '') },
      })
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.phoneInput}>
        <label className={styles.label}>Контактный телефон</label>
        <input
          type="phone"
          className={`${styles.inputName} ${phoneHasError ? styles.inputError : ''}`}
          value={phone}
          onChange={onPhoneChange}
          placeholder="+7 ___ ___ __ __"
          onFocus={addCountryCode}
        />
      </div>
      <div className={styles.emailInput}>
        <label className={styles.label}>E-mail</label>
        <input
          type="email"
          className={`${styles.inputName} ${emailHasError ? styles.inputError : ''}`}
          value={email}
          onChange={onEmailChange}
          placeholder="inbox@gmail.ru"
        />
      </div>
    </div>
  )
}

export default PhoneAndEmailInput
