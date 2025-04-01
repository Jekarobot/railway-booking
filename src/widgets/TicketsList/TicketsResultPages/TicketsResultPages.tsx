import React from 'react'
import styles from './TicketsResultPages.module.css'
import TrainCard from './TrainCard/TrainCard'
import { RouteItem } from '../../../shared/types/RoutesResponse'

interface TicketsResultPagesProps {
  tickets: RouteItem[] | undefined
  onSelectTicket: (ticket: RouteItem) => void
}

const TicketsResultPages: React.FC<TicketsResultPagesProps> = ({ tickets, onSelectTicket }) => {
  return (
    <div className={styles.ticketsResultPages}>
      {tickets ? (
        tickets.map((ticket, index) => (
          <TrainCard key={index} {...ticket} onSelect={() => onSelectTicket(ticket)} />
        ))
      ) : (
        <p>Нет доступных маршрутов</p>
      )}
    </div>
  )
}

export default TicketsResultPages
