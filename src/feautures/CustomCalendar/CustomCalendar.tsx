import React, { useState } from 'react'
import Calendar, { CalendarProps } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styles from './CustomCalendar.module.css'

interface CustomCalendarProps {
  value: Date | [Date, Date] | null
  onChange: CalendarProps['onChange']
  isAside?: boolean
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ value, onChange, isAside }) => {
  const [activeStartDate, setActiveStartDate] = useState(new Date())

  const handlePrevClick = () => {
    setActiveStartDate(new Date(activeStartDate.setMonth(activeStartDate.getMonth() - 1)))
  }

  const handleNextClick = () => {
    setActiveStartDate(new Date(activeStartDate.setMonth(activeStartDate.getMonth() + 1)))
  }

  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      if (date.getDay() === 0) {
        return styles.sunday
      } else if (date.getDay() === 6) {
        return styles.saturday
      } else if (value instanceof Date && date.toDateString() === value.toDateString()) {
        return styles.activeDay
      } else {
        return styles.day
      }
    } else if (view === 'year') {
      return styles.month
    } else if (view === 'decade') {
      return styles.year
    }
    return ''
  }

  return (
    <div className={isAside ? styles.asideCalendarContainer : styles.calendarContainer}>
      <div className={styles.customNavigation}>
        <button onClick={handlePrevClick} className={styles.customArrow}>
          🢐
        </button>
        <span className={styles.customNavigationLabel}>
          {activeStartDate.toLocaleString('default', { month: 'long' })}
        </span>
        <button onClick={handleNextClick} className={styles.customArrow}>
          🢒
        </button>
      </div>
      <Calendar
        onChange={onChange}
        value={value}
        defaultView="month"
        className={styles.reactCalendar}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            setActiveStartDate(activeStartDate)
          }
        }}
        prev2Label={null}
        next2Label={null}
        formatShortWeekday={() => ''}
        formatMonthYear={(locale, date) => date.toLocaleString(locale, { month: 'long' })}
        tileClassName={getTileClassName}
        minDetail="month"
        maxDetail="month"
        showNavigation={false}
      />
    </div>
  )
}

export default CustomCalendar
