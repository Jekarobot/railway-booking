import React, { useEffect } from 'react'
import styles from './TicketsResultPages.module.css'
import TrainCard from '../../../entities/TrainCard/TrainCard'
import { RouteItem } from '../../../shared/types/RoutesResponse'
import { usePopup } from '../../../providers/PopupProvider/PopupContext'

interface TicketsResultPagesProps {
  tickets: RouteItem[] | undefined
  onSelectTicket: (ticket: RouteItem) => void
}

const TicketsResultPages: React.FC<TicketsResultPagesProps> = ({ tickets, onSelectTicket }) => {
  const { setShowPopup, setHeader, setContent, setPopupType } = usePopup()

  useEffect(() => {
    if (tickets === undefined || (Array.isArray(tickets) && tickets.length === 0)) {
      setPopupType('error')
      setHeader('Ошибка')
      setContent('Нет доступных маршрутов')
      setShowPopup(true)
    }
  }, [tickets])

  return (
    <div className={styles.ticketsResultPages}>
      {tickets ? (
        tickets.map((ticket, index) => (
          <TrainCard
            key={index}
            buttonType="selectSeats"
            ticket={ticket}
            onSelect={() => onSelectTicket(ticket)}
          />
        ))
      ) : (
        <p>Нет доступных маршрутов</p>
      )}
    </div>
  )
}

export default TicketsResultPages
