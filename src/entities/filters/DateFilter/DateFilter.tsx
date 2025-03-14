import styles from './DateFilter.module.css'
import { useState } from 'react'

import CalendarIcon from '../../../shared/assets/svg/TicketSearch/Calendar.svg'
import CustomCalendar from '../../../features/CustomCalendar/CustomCalendar'

const DateFilter = () => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)

  const toggleStartCalendar = () => {
    setShowStartCalendar((prev) => !prev)
  }

  const toggleEndCalendar = () => {
    setShowEndCalendar((prev) => !prev)
  }

  return (
    <div className={styles.groupDate}>
      <div className={styles.inputGroup}>
        <h2 className={styles.header}>Дата поездки</h2>
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
            isAside={true}
          />
        )}
      </div>

      <div className={styles.inputGroup}>
        <h2 className={styles.header}>Дата возвращения</h2>
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
            isAside={true}
          />
        )}
      </div>
    </div>
  )
}

export default DateFilter
