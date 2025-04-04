import React, { useEffect } from 'react'
import styles from './TicketDetails.module.css'
import { useTrainDetails } from '../../../providers/TrainDetailsProvider/TrainDetailsProvider'
import TicketDetailsRoute from './TicketDetailsRoute/TicketDetailsRoute'

interface TicketDetailsProps {
  onBack: () => void
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ onBack }) => {
  const { arrivalTrainId, departureTrainId, arrivalSeatsData, departureSeatsData, selectedTicket } =
    useTrainDetails()

  return (
    <div className={styles.ticketDetails}>
      <h1 className={styles.title}>Выбор мест</h1>
      <TicketDetailsRoute isDeparture={false} onBack={onBack} />
      {departureTrainId && <TicketDetailsRoute isDeparture={true} onBack={onBack} />}
    </div>
  )
}

export default TicketDetails
