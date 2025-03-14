import React from 'react'
import styles from './LastTickets.module.css'
import LastTicketsItem from './LastTicketsItem/LastTicketsItem'

interface LastTicketsProps {
  tickets: any[]
}

const LastTickets: React.FC<LastTicketsProps> = ({ tickets }) => {
  return (
    <div className={styles.LastTickets}>
      <h1 className={styles.text}>Последние билеты</h1>
      <LastTicketsItem ticket={tickets[0]} />
      <LastTicketsItem ticket={tickets[1]} />
      <LastTicketsItem ticket={tickets[2]} />
    </div>
  )
}

export default LastTickets
