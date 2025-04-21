import React from 'react'
import styles from './PassengersCheckout.module.css'
import PassengerIcon from '../../../shared/assets/svg/PassengerIcon.svg'
import RubleIcon from '../../../shared/assets/svg/Ruble.svg'

import { Seat } from '../../../shared/types/Order'

import { useOrder } from '../../../providers/OrderBuildProvider/OrderContext'

interface PassengersCheckoutProps {
  onButtonClick: () => void // функция для кнопки, если это не "Выбрать места"
}
const PassengersCheckout = ({ onButtonClick }: PassengersCheckoutProps) => {
  const { order, price } = useOrder()

  const renderPassengers = (seats: Seat[]) => {
    return seats.map((seat) => (
      <div key={seat.seat_id} className={styles.passenger}>
        <div className={styles.passengerMain}>
          <img className={styles.passengerIcon} src={PassengerIcon} alt="Passenger Icon" />
          <h2 className={styles.age}>{seat.person_info.is_adult ? 'Взрослый' : 'Детский'}</h2>
        </div>
        <div className={styles.passengerDetails}>
          <p className={styles.name}>
            {seat.person_info.last_name} {seat.person_info.first_name} {seat.person_info.patronymic}
          </p>
          <div className={styles.detailsContainer}>
            <p className={styles.detail}>Пол {seat.person_info.gender ? 'мужской' : 'женский'}</p>
            <p className={styles.detail}>Дата рождения {seat.person_info.birthday}</p>
            <p className={styles.detail}>
              {seat.person_info.document_type === 'passport'
                ? 'Паспорт РФ'
                : 'Свидетельство о рождении'}{' '}
              {seat.person_info.document_data}
            </p>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <div className={styles.main}>
      <div className={styles.passengersContainer}>
        {order.arrival?.seats && renderPassengers(order.arrival.seats)}
        {order.departure?.seats && renderPassengers(order.departure.seats)}
      </div>
      <div className={styles.btnContainer}>
        <div className={styles.priceContainer}>
          <h1 className={styles.priceText}>Всего</h1>
          <p className={styles.price}>
            {price} <img src={RubleIcon} className={styles.priceIcon} alt="Ruble Icon" />
          </p>
        </div>
        <button className={styles.returnButton} onClick={onButtonClick}>
          Изменить
        </button>
      </div>
    </div>
  )
}

export default PassengersCheckout
