import React, { useState, useCallback } from 'react'
import styles from './DocumentInput.module.css'
import { ValidationError } from '../../../../shared/hooks/usePassengerValidation'

interface DocumentInputProps {
  isSelectedPassport: boolean
  onDocumentTypeChange: (isPassport: boolean) => void
  passportSeries: string
  onPassportSeriesChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  passportNumber: string
  onPassportNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  birthCertificate: string
  onBirthCertificateChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  wrongInput: ValidationError[]
}

const DocumentInput: React.FC<DocumentInputProps> = ({
  isSelectedPassport,
  onDocumentTypeChange,
  passportSeries,
  onPassportSeriesChange,
  passportNumber,
  onPassportNumberChange,
  birthCertificate,
  onBirthCertificateChange,
  wrongInput,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev)
  }, [])

  const handleDocumentTypeChange = useCallback(
    (isPassport: boolean) => {
      onDocumentTypeChange(isPassport)
      setIsDropdownOpen(false)
    },
    [onDocumentTypeChange]
  )

  const hasPassportSeriesError = wrongInput.some((error) => error.field === 'passportSeries')
  const hasPassportNumberError = wrongInput.some((error) => error.field === 'passportNumber')
  const hasBirthCertificateError = wrongInput.some((error) => error.field === 'birthCertificate')

  return (
    <div className={styles.documentsContainer}>
      <div className={styles.customSelect}>
        <label className={styles.label}>Тип документа</label>
        <div
          className={`${styles.selectHeader} ${
            isSelectedPassport ? styles.selectHeaderPassport : styles.selectHeaderBirth
          }`}
          onClick={toggleDropdown}
        >
          {isSelectedPassport ? 'Паспорт' : 'Свидетельство о рождении'}
        </div>
        {isDropdownOpen && (
          <div
            className={`${styles.selectOptions} ${
              isSelectedPassport ? styles.selectOptionsPassport : styles.selectOptionsBirth
            }`}
          >
            <div onClick={() => handleDocumentTypeChange(true)} className={styles.option}>
              Паспорт
            </div>
            <div onClick={() => handleDocumentTypeChange(false)} className={styles.option}>
              Свидетельство о рождении
            </div>
          </div>
        )}
      </div>
      {isSelectedPassport ? (
        <div className={styles.passportInputs}>
          <div className={styles.documentLabelContainer}>
            <label className={styles.label}>Серия</label>
            <input
              type="number"
              placeholder="_ _ _ _"
              className={`${styles.documentInputSeries} ${hasPassportSeriesError ? styles.inputError : ''}`}
              value={passportSeries}
              onChange={onPassportSeriesChange}
            />
          </div>
          <div className={styles.documentLabelContainer}>
            <label className={styles.label}>Номер</label>
            <input
              type="number"
              placeholder="_ _ _ _ _ _"
              className={`${styles.documentInputNumber} ${hasPassportNumberError ? styles.inputError : ''}`}
              value={passportNumber}
              onChange={onPassportNumberChange}
            />
          </div>
        </div>
      ) : (
        <div className={styles.birthCertificateInputs}>
          <div className={styles.documentLabelContainer}>
            <label className={styles.label}>Серия</label>
            <input
              type="text"
              placeholder="12 символов"
              className={`${styles.birthСertificateInput} ${hasBirthCertificateError ? styles.inputError : ''}`}
              value={birthCertificate}
              onChange={onBirthCertificateChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentInput
