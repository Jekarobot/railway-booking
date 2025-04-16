import React from 'react'
import styles from './CoachFourthSeats.module.css'
import { Seat, Coach } from '../../../../../../../../../shared/types/DetailsResponse'
import { useOrder } from '../../../../../../../../../providers/OrderBuildProvider/OrderContext'
import RubleIcon from '../../../../../../../../../shared/assets/svg/Ruble.svg'
import fourthCoachImage from '../../../../../../../../../shared/assets/coachSchemes/FourthCoach.png'

interface CoachFourthSeatsProps {
  seatPrice: number[]
  seats: Seat[]
  coach: Coach
  isDeparture: boolean
}

const CoachFourthSeats: React.FC<CoachFourthSeatsProps> = ({
  seatPrice,
  seats,
  coach,
  isDeparture,
}) => {
  console.log('Места:', seats)
  const totalSeats = Array.from({ length: 62 }, (_, index) => index + 1)

  const { toggleSeat, isSeatSelected, price } = useOrder()

  const handleSeatClick = (seatNumber: number) => {
    toggleSeat(
      {
        coach_id: coach._id,
        seat_number: seatNumber,
      },
      isDeparture,
      seatPrice[0]
    )
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.coachFourth}
        style={{
          backgroundImage: `url(${fourthCoachImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={styles.coachNumberFourth}>
          <p className={styles.coachNumberFourthText}>{coach.coach_number}</p>
        </div>
        <div className={styles.buttonPlaceContainer}>
          {totalSeats.map((seatNumber) => {
            const seat = seats.find((s) => s.index === seatNumber)
            return (
              <button
                key={seatNumber}
                className={`
                ${styles.seat} 
                ${styles[`seat${seatNumber}`]} 
                ${seat?.available ? styles.seatAvailable : styles.seatUnavailable} 
                ${isSeatSelected(seatNumber, coach._id, isDeparture) ? styles.seatSelected : ''}`}
                onClick={seat?.available ? () => handleSeatClick(seatNumber) : undefined}
              >
                {seatNumber}
              </button>
            )
          })}
        </div>
      </div>
      <div className={styles.currentPrice}>
        <p className={styles.currentPriceText}>
          {price} <img className={styles.currentPriceIcon} src={RubleIcon} alt="Ruble" />
        </p>
      </div>
    </div>
  )
}

export default CoachFourthSeats
