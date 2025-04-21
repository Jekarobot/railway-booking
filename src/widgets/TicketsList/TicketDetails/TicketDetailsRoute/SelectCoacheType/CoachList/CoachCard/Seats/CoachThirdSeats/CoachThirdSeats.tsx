import React from 'react'
import styles from './CoachThirdSeats.module.css'
import { Seat, Coach } from '../../../../../../../../../shared/types/DetailsResponse'
import { useOrder } from '../../../../../../../../../providers/OrderBuildProvider/OrderContext'
import RubleIcon from '../../../../../../../../../shared/assets/svg/Ruble.svg'
import thirdCoachImage from '../../../../../../../../../shared/assets/coachSchemes/ThirdCoach.png'

interface CoachThirdSeatsProps {
  seatPrice: number[]
  seats: Seat[]
  coach: Coach
  isDeparture: boolean
}

const CoachThirdSeats: React.FC<CoachThirdSeatsProps> = ({
  seatPrice,
  seats,
  coach,
  isDeparture,
}) => {
  // console.log('Места:', seats)
  const totalSeats = Array.from({ length: 48 }, (_, index) => index + 1)

  const { toggleSeat, isSeatSelected, price } = useOrder()

  const handleSeatClick = (
    seatNumber: number,
    isTop: boolean | undefined,
    isSide: boolean | undefined
  ) => {
    if (isSide) {
      // Если место боковое, используем цену для боковых мест
      toggleSeat(
        {
          coach_id: coach._id,
          seat_number: seatNumber,
        },
        isDeparture,
        seatPrice[2]
      )
    } else if (isTop) {
      // Если место верхнее, используем цену для верхних мест
      toggleSeat(
        {
          coach_id: coach._id,
          seat_number: seatNumber,
        },
        isDeparture,
        seatPrice[0]
      )
    } else {
      // Если место нижнее, используем цену для нижних мест
      toggleSeat(
        {
          coach_id: coach._id,
          seat_number: seatNumber,
        },
        isDeparture,
        seatPrice[1]
      )
    }
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.coachThird}
        style={{
          backgroundImage: `url(${thirdCoachImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={styles.coachNumberThird}>
          <p className={styles.coachNumberThirdText}>{coach.coach_number}</p>
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
                ${seatNumber <= 32 ? (seatNumber % 2 === 0 ? styles.seatTop : styles.seatBottom) : styles.seatSide}
                ${seat?.available ? styles.seatAvailable : styles.seatUnavailable} 
                ${isSeatSelected(seatNumber, coach._id, isDeparture) ? styles.seatSelected : ''}`}
                onClick={
                  seat?.available
                    ? () => handleSeatClick(seatNumber, seat?.isTop, seat?.isSide)
                    : undefined
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

export default CoachThirdSeats
