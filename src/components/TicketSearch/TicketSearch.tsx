import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './TicketSearch.module.css'
import Reverse from '../../assets/svg/Reverse.svg'
import LocationIcon from '../../assets/svg/Location.svg'
import CalendarIcon from '../../assets/svg/Calendar.svg'
import CustomCalendar from '../CustomCalendar/CustomCalendar'

interface TicketSearchProps {
  isWide: boolean
}

const TicketSearch: React.FC<TicketSearchProps> = ({ isWide }) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)
  const navigate = useNavigate()

  const toggleStartCalendar = () => {
    setShowStartCalendar((prev) => !prev)
  }

  const toggleEndCalendar = () => {
    setShowEndCalendar((prev) => !prev)
  }

  const handleSearchClick = () => {
    navigate('/results')
  }

  return (
    <div className={isWide ? styles.wideForm : styles.narrowForm}>
      <div className={styles.formDirection}>
        <h2 className={styles.formTitle}>Направление</h2>
        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <input type="text" className={styles.inputField} placeholder="Откуда" />
            <img src={LocationIcon} alt="Location" className={styles.inputIcon} />
          </div>
          <button className={styles.reverseButton}>
            <img src={Reverse} alt="Reverse" />
          </button>
          <div className={styles.inputGroup}>
            <input type="text" className={styles.inputField} placeholder="Куда" />
            <img src={LocationIcon} alt="Location" className={styles.inputIcon} />
          </div>
        </div>
      </div>
      <div className={styles.formDate}>
        <h2 className={styles.formTitle}>Дата</h2>
        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.inputField}
              placeholder="ДД/ММ/ГГ"
              value={startDate ? startDate.toLocaleDateString() : ''}
              onClick={toggleStartCalendar}
              readOnly
            />
            <img src={CalendarIcon} alt="Calendar" className={styles.inputIcon} />
            {showStartCalendar && (
              <CustomCalendar
                value={startDate || new Date()}
                onChange={(date) => {
                  setStartDate(date as Date)
                  setShowStartCalendar(false)
                }}
              />
            )}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.inputField}
              placeholder="ДД/ММ/ГГ"
              value={endDate ? endDate.toLocaleDateString() : ''}
              onClick={toggleEndCalendar}
              readOnly
            />
            <img src={CalendarIcon} alt="Calendar" className={styles.inputIcon} />
            {showEndCalendar && (
              <CustomCalendar
                value={endDate || new Date()}
                onChange={(date) => {
                  setEndDate(date as Date)
                  setShowEndCalendar(false)
                }}
              />
            )}
          </div>
        </div>
      </div>
      <button
        className={`${styles.searchButton} ${isWide ? undefined : styles.searchButtonNarrow}`}
        onClick={handleSearchClick}
      >
        Найти билеты
      </button>
    </div>
  )
}

export default TicketSearch
