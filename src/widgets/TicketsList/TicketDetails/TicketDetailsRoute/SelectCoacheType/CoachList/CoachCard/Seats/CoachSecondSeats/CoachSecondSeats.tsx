import React from 'react'
import styles from './CoachSecondSeats.module.css'
import { Seat, Coach } from '../../../../../../../../../shared/types/DetailsResponse'
import { useOrder } from '../../../../../../../../../providers/OrderBuildProvider/OrderContext'
import RubleIcon from '../../../../../../../../../shared/assets/svg/Ruble.svg'
import secondCoachImage from '../../../../../../../../../shared/assets/coachSchemes/SecondCoach.png'

interface CoachSecondSeatsProps {
  seatPrice: number[]
  seats: Seat[]
  coach: Coach
  isDeparture: boolean
}

const CoachSecondSeats: React.FC<CoachSecondSeatsProps> = ({
  seatPrice,
  seats,
  coach,
  isDeparture,
}) => {
  console.log('Места:', seats)
  const totalSeats = Array.from({ length: 32 }, (_, index) => index + 1)

  const { toggleSeat, isSeatSelected, price } = useOrder()

  const handleSeatClick = (seatNumber: number, isTop: boolean | undefined) => {
    if (isTop === undefined) return
    if (isTop) {
      toggleSeat(
        {
          coach_id: coach._id,
          seat_number: seatNumber,
        },
        isDeparture,
        seatPrice[0]
      )
    } else if (!isTop) {
      toggleSeat(
        {
          coach_id: coach._id,
          seat_number: seatNumber,
        },
        isDeparture,
        seatPrice[1]
      )
    }
    console.log('цены:', seatPrice)
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.coachSecond}
        style={{
          backgroundImage: `url(${secondCoachImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} // инлайновые стили, чтобы точно подтянулся фон, с ним были проблемы
      >
        <div className={styles.coachNumberSecond}>
          <p className={styles.coachNumberSecondText}>{coach.coach_number}</p>
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
                ${seatNumber % 2 === 0 ? styles.seatTop : styles.seatBottom}
                ${seat?.available ? styles.seatAvailable : styles.seatUnavailable} 
                ${isSeatSelected(seatNumber, coach._id, isDeparture) ? styles.seatSelected : ''}`}
                onClick={
                  seat?.available ? () => handleSeatClick(seatNumber, seat?.isTop) : undefined
                }
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

export default CoachSecondSeats
