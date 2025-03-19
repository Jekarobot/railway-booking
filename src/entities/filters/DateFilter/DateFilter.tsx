import styles from './DateFilter.module.css'
import { useState } from 'react'
import { useSearchContext } from '../../../providers/SearchProvider/SearchContext'

import CalendarIcon from '../../../shared/assets/svg/TicketSearch/Calendar.svg'
import CustomCalendar from '../../../features/CustomCalendar/CustomCalendar'

const DateFilter = () => {
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)

  const { searchParams, updateSearchParams } = useSearchContext()

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
          value={searchParams.date_start || ''}
          onClick={toggleStartCalendar}
          readOnly
        />
        <img src={CalendarIcon} alt="Calendar" className={styles.inputIcon} />
        {showStartCalendar && (
          <CustomCalendar
            value={searchParams.date_start ? new Date(searchParams.date_start) : new Date()}
            onChange={(date) => {
              if (date instanceof Date) {
                updateSearchParams({ date_start: date.toLocaleDateString('ru-RU') })
              } else if (Array.isArray(date) && date[0] instanceof Date) {
                updateSearchParams({ date_start: date[0].toLocaleDateString('ru-RU') })
              }
              setShowStartCalendar(false)
            }}
          />
        )}
      </div>

      <div className={styles.inputGroup}>
        <h2 className={styles.header}>Дата возвращения</h2>
        <input
          type="text"
          className={styles.inputField}
          placeholder="ДД/ММ/ГГ"
          value={searchParams.date_end || ''}
          onClick={toggleEndCalendar}
          readOnly
        />
        <img src={CalendarIcon} alt="Calendar" className={styles.inputIcon} />
        {showEndCalendar && (
          <CustomCalendar
            value={searchParams.date_end ? new Date(searchParams.date_end) : new Date()}
            onChange={(date) => {
              if (date instanceof Date) {
                updateSearchParams({ date_end: date.toLocaleDateString('ru-RU') })
              } else if (Array.isArray(date) && date[0] instanceof Date) {
                updateSearchParams({ date_end: date[0].toLocaleDateString('ru-RU') })
              }
              setShowEndCalendar(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default DateFilter
