import { useState } from 'react'
import styles from './Passengers.module.css'
import { useOrder } from '../../providers/OrderBuildProvider/OrderContext'
import Passenger from './Passenger/Passenger'
import plus from '../../shared/assets/svg/Passenger/Plus.svg'
import { PersonInfo } from '../../shared/types/Order'

interface PassengersProps {
  setActiveStep: (step: number) => void
}

const Passengers: React.FC<PassengersProps> = ({ setActiveStep }) => {
  const { order } = useOrder()

  const [activePassenger, setActivePassenger] = useState([
    order.arrival?.seats?.find((seat) => seat.seat_id)?.seat_id ||
      order.departure?.seats?.find((seat) => seat.seat_id)?.seat_id,
  ])

  const toggleActivePassenger = (seatId: string) => {
    if (activePassenger.includes(seatId)) {
      const updatedActivePassenger = activePassenger.filter((id) => id !== seatId)
      setActivePassenger(updatedActivePassenger)
    } else {
      setActivePassenger([...activePassenger, seatId])
    }
  }

  const handleAddPassenger = () => {
    setActiveStep(1)
  }

  const validateFilledData = () => {
    const isPersonInfoComplete = (personInfo: PersonInfo) => {
      return (
        personInfo &&
        typeof personInfo.is_adult === 'boolean' &&
        personInfo.first_name.trim() !== '' &&
        personInfo.last_name.trim() !== '' &&
        personInfo.patronymic.trim() !== '' &&
        typeof personInfo.gender === 'boolean' &&
        personInfo.birthday.trim() !== '' &&
        personInfo.document_type.trim() !== '' &&
        personInfo.document_data.trim() !== ''
      )
    }

    const allSeatsHaveCompletePersonInfo = order.arrival.seats?.every(
      (seat) => seat.person_info && isPersonInfoComplete(seat.person_info)
    )

    return allSeatsHaveCompletePersonInfo
  }

  const handleNextStep = () => {
    if (validateFilledData()) {
      setActiveStep(3)
    } else {
      alert('Не заполнены данные пассажира')
      return
    }
  }

  return (
    <div className={styles.passengersContainer}>
      {order.arrival?.seats?.map((seat, index) => {
        return (
          <Passenger
            key={seat.seat_id}
            passengerID={seat.seat_id}
            seat={seat}
            index={index}
            activePassenger={activePassenger}
            toggleActivePassenger={toggleActivePassenger}
            isDeparture={false}
          />
        )
      })}
      {order.departure?.seats?.map((seat, index) => {
        return (
          <Passenger
            key={seat.seat_id}
            passengerID={seat.seat_id}
            seat={seat}
            index={index}
            activePassenger={activePassenger}
            toggleActivePassenger={toggleActivePassenger}
            isDeparture={true}
          />
        )
      })}
      <div className={styles.addPassenger}>
        <p className={styles.addPassengerText}>Добавить пассажира</p>
        <button onClick={handleAddPassenger} className={styles.addPassengerButton}>
          <img src={plus}></img>
        </button>
      </div>
      <button
        className={`${styles.nextStep} ${validateFilledData() ? styles.nextStepActive : styles.nextStepNonActive}`}
        onClick={handleNextStep}
      >
        Далее
      </button>
    </div>
  )
}

export default Passengers
