import React from 'react'
import styles from './NameInput.module.css'
import { ValidationError } from '../../../../shared/hooks/usePassengerValidation'

interface NameInputProps {
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  wrongInput: ValidationError[]
  fieldName: string
}

const NameInput: React.FC<NameInputProps> = ({ label, value, onChange, wrongInput, fieldName }) => {
  const hasError = wrongInput.some((error) => error.field === fieldName)

  return (
    <div className={styles.nameInput}>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        className={`${styles.inputName} ${hasError ? styles.inputError : ''}`}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default NameInput
