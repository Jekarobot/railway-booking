import React from 'react'
import Calendar, { CalendarProps } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './CustomCalendar.module.css'
import styles from './CustomCalendar.module.css'

interface CustomCalendarProps {
  value: Date | [Date, Date] | null
  onChange: CalendarProps['onChange']
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ value, onChange }) => {
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
    <div className={styles.calendarContainer}>
      <Calendar
        onChange={onChange}
        value={value}
        defaultView="month"
        className={styles.reactCalendar}
        prev2Label={null}
        next2Label={null}
        prevLabel={<span className={styles.customArrow}>🢐</span>}
        nextLabel={<span className={styles.customArrow}>🢒</span>}
        formatShortWeekday={() => ''}
        formatMonthYear={(locale, date) => date.toLocaleString(locale, { month: 'long' })}
        navigationLabel={({ label }) => (
          <span className={styles.customNavigationLabel}>{label}</span>
        )}
        tileClassName={getTileClassName}
        minDetail="month"
        maxDetail="month"
      />
    </div>
  )
}

export default CustomCalendar
