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
          value={searchParams.dateStart || ''}
          onClick={toggleStartCalendar}
          readOnly
        />
        <img src={CalendarIcon} alt="Calendar" className={styles.inputIcon} />
        {showStartCalendar && (
          <CustomCalendar
            value={searchParams.dateStart ? new Date(searchParams.dateStart) : new Date()}
            onChange={(date) => {
              if (date instanceof Date) {
                updateSearchParams({ dateStart: date.toLocaleDateString('ru-RU') })
              } else if (Array.isArray(date) && date[0] instanceof Date) {
                updateSearchParams({ dateStart: date[0].toLocaleDateString('ru-RU') })
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
          value={searchParams.dateEnd || ''}
          onClick={toggleEndCalendar}
          readOnly
        />
        <img src={CalendarIcon} alt="Calendar" className={styles.inputIcon} />
        {showEndCalendar && (
          <CustomCalendar
            value={searchParams.dateEnd ? new Date(searchParams.dateEnd) : new Date()}
            onChange={(date) => {
              if (date instanceof Date) {
                updateSearchParams({ dateEnd: date.toLocaleDateString('ru-RU') })
              } else if (Array.isArray(date) && date[0] instanceof Date) {
                updateSearchParams({ dateEnd: date[0].toLocaleDateString('ru-RU') })
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
