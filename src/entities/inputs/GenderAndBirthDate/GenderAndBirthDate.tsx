import React from 'react'
import styles from './GenderAndBirthDate.module.css'
import { ValidationError } from '../../../shared/hooks/usePassengerValidation'

interface GenderAndBirthDateProps {
  gender: boolean
  onGenderChange: (gender: boolean) => void
  birthday: string
  onBirthdayChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  wrongInput: ValidationError[]
  fieldName: string
}

const GenderAndBirthDate: React.FC<GenderAndBirthDateProps> = ({
  gender,
  onGenderChange,
  birthday,
  onBirthdayChange,
  wrongInput,
  fieldName,
}) => {
  const hasError = wrongInput.some((error) => error.field === fieldName)

  return (
    <div className={styles.maleAndDateContainer}>
      <div className={styles.maleContainer}>
        <label className={styles.label}>Пол</label>
        <div className={styles.maleButton}>
          <label
            className={`${styles.radioLabelMale} ${gender === true ? styles.radioLabelActive : ''}`}
          >
            <input
              type="radio"
              name="gender"
              value="M"
              checked={gender === true}
              onChange={() => onGenderChange(true)}
            />
            М
          </label>
          <label
            className={`${styles.radioLabelFemale} ${gender === false ? styles.radioLabelActive : ''}`}
          >
            <input
              type="radio"
              name="gender"
              value="F"
              checked={gender === false}
              onChange={() => onGenderChange(false)}
            />
            Ж
          </label>
        </div>
      </div>
      <div className={styles.dateContainer}>
        <label className={styles.label}>Дата рождения</label>
        <input
          type="date"
          className={`${styles.inputDate} ${hasError ? styles.inputError : ''}`}
          value={birthday}
          onChange={onBirthdayChange}
        />
      </div>
    </div>
  )
}

export default GenderAndBirthDate
