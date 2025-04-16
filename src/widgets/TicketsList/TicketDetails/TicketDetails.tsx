import React from 'react'
import styles from './TicketDetails.module.css'
import { useTrainDetails } from '../../../providers/TrainDetailsProvider/TrainDetailsProvider'
import TicketDetailsRoute from './TicketDetailsRoute/TicketDetailsRoute'
import { useOrder } from '../../../providers/OrderBuildProvider/OrderContext'

interface TicketDetailsProps {
  onBack: () => void
  setActiveStep: (step: number) => void
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ onBack, setActiveStep }) => {
  const { departureTrainId } = useTrainDetails()
  const { order } = useOrder()

  const validateArrivalPlaces = () => {
    if (order.arrival.seats.length === 0) {
      return false
    } else {
      return order.arrival.seats.every((seat) => seat.seat_number !== null)
    }
  }

  const handleNextStep = () => {
    if (validateArrivalPlaces()) {
      setActiveStep(2)
    } else {
      alert('Не выбраны места')
      return
    }
  }

  return (
    <div className={styles.ticketDetails}>
      <h1 className={styles.title}>Выбор мест</h1>
      <TicketDetailsRoute isDeparture={false} onBack={onBack} />
      {departureTrainId && <TicketDetailsRoute isDeparture={true} onBack={onBack} />}
      <button
        className={`${styles.nextStep} ${validateArrivalPlaces() ? styles.nextStepActive : styles.nextStepNonActive}`}
        onClick={handleNextStep}
      >
        Далее
      </button>
    </div>
  )
}

export default TicketDetails
