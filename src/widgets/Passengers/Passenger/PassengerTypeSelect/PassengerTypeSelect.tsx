import React, { useState, useCallback } from 'react'
import styles from './PassengerTypeSelect.module.css'

interface PassengerTypeSelectProps {
  isAdult: boolean
  onChange: (type: 'adult' | 'child') => void
}

const PassengerTypeSelect: React.FC<PassengerTypeSelectProps> = ({ isAdult, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev)
  }, [])

  const handleSelect = useCallback(
    (type: 'adult' | 'child') => {
      onChange(type)
      setIsDropdownOpen(false)
    },
    [onChange]
  )

  return (
    <div className={styles.customSelect}>
      <div className={styles.selectHeader} onClick={toggleDropdown}>
        {isAdult ? 'Взрослый' : 'Детский'}
      </div>
      {isDropdownOpen && (
        <div className={styles.selectOptions}>
          <div onClick={() => handleSelect('adult')} className={styles.option}>
            Взрослый
          </div>
          <div onClick={() => handleSelect('child')} className={styles.option}>
            Детский
          </div>
        </div>
      )}
    </div>
  )
}

export default PassengerTypeSelect
