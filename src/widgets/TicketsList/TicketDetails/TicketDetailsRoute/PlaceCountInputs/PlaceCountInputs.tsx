import React from 'react'
import styles from './PlaceCountInputs.module.css'
import { useOrder } from '../../../../../providers/OrderBuildProvider/OrderContext'
import { Seat } from '../../../../../shared/types/Order'

interface PlaceCountInputsProps {
  isDeparture: boolean
}

const PlaceCountInputs: React.FC<PlaceCountInputsProps> = ({ isDeparture }) => {
  const { updateOrder } = useOrder()

  const updateValueAdults = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value) || 0
    value = Math.max(0, Math.min(value, 3))

    updateOrder((prevOrder) => {
      const prevSeats = isDeparture ? prevOrder.departure.seats : prevOrder.arrival.seats

      const filteredSeats = prevSeats.filter((seat) => seat.is_child)

      const newAdultSeats: Seat[] = Array.from({ length: value }, () => ({
        coach_id: '',
        seat_number: null,
        is_child: false, // Взрослый билет
        include_children_seat: false,
        person_info: {
          is_adult: true,
          first_name: '',
          last_name: '',
          patronymic: '',
          gender: true, // Мужской (значение по умолчанию)
          birthday: '',
          document_type: '',
          document_data: '',
        },
      }))

      return isDeparture
        ? {
            ...prevOrder,
            departure: {
              ...prevOrder.departure,
              seats: [...filteredSeats, ...newAdultSeats], // Обновляем seats
            },
          }
        : {
            ...prevOrder,
            arrival: {
              ...prevOrder.arrival,
              seats: [...filteredSeats, ...newAdultSeats],
            },
          }
    })
    event.target.value = value.toString()
  }

  const updateValueKids = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value) || 0
    value = Math.max(0, Math.min(value, 3))

    updateOrder((prevOrder) => {
      const prevSeats = isDeparture ? prevOrder.departure.seats : prevOrder.arrival.seats

      const filteredSeats = prevSeats.filter((seat) => !seat.is_child)

      const newKidSeats: Seat[] = Array.from({ length: value }, () => ({
        coach_id: '',
        seat_number: null,
        is_child: true, // Детский билет
        include_children_seat: false, // Не требуется доп. место
        person_info: {
          is_adult: true,
          first_name: '',
          last_name: '',
          patronymic: '',
          gender: true, // Мужской (значение по умолчанию)
          birthday: '',
          document_type: '',
          document_data: '',
        },
      }))

      return isDeparture
        ? {
            ...prevOrder,
            departure: {
              ...prevOrder.departure,
              seats: [...filteredSeats, ...newKidSeats],
            },
          }
        : {
            ...prevOrder,
            arrival: {
              ...prevOrder.arrival,
              seats: [...filteredSeats, ...newKidSeats],
            },
          }
    })
    event.target.value = value.toString()
  }

  const updateValueKidsNoPlace = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value) || 0
    value = Math.max(0, Math.min(value, 3))

    updateOrder((prevOrder) => {
      const prevSeats = isDeparture ? prevOrder.departure.seats : prevOrder.arrival.seats

      // Отделяем взрослых и детей с местами
      const adultSeats = prevSeats.filter((seat) => !seat.is_child)
      const kidSeats = prevSeats.filter((seat) => seat.is_child)
      // Обновляем у первых `value` взрослых билетов поле include_children_seat
      const updatedAdults = adultSeats.map((seat, index) => ({
        ...seat,
        include_children_seat: index < value, // Первым N взрослым ставим true
      }))

      return isDeparture
        ? {
            ...prevOrder,
            departure: {
              ...prevOrder.departure,
              seats: [...updatedAdults, ...kidSeats], // Собираем обновленный список
            },
          }
        : {
            ...prevOrder,
            arrival: {
              ...prevOrder.arrival,
              seats: [...updatedAdults, ...kidSeats],
            },
          }
    })

    event.target.value = value.toString()
  }

  return (
    <div className={styles.main}>
      <p className={styles.head}>Количество билетов</p>
      <div className={styles.inputsContainer} id="inputsContainer">
        <div className={styles.adultContainer}>
          <label htmlFor="adultInput" className={styles.inputLabelAdult}>
            Взрослых —
          </label>
          <input
            type="number"
            id="adultInput"
            className={styles.adultInput}
            onChange={updateValueAdults}
            defaultValue={0}
            min={1}
            max={3}
          ></input>
          <p className={styles.adultText}>Можно добавить еще 3 пассажиров</p>
        </div>
        <div className={styles.kidsContainer}>
          <label htmlFor="kidsInput" className={styles.inputLabelKids}>
            Детских —
          </label>
          <input
            type="number"
            id="kidsInput"
            className={styles.kidsInput}
            onChange={updateValueKids}
            defaultValue={0}
            min={0}
            max={3}
          ></input>
          <p className={styles.kidsText}>
            Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в
            среднем на 50-65%
          </p>
        </div>
        <div className={styles.kidsNoPlaceContainer}>
          <label htmlFor="kidsNoPlaceInput" className={styles.inputLabelKidsNoPlace}>
            Детских «без места» —
          </label>
          <input
            type="number"
            id="kidsNoPlaceInput"
            className={styles.kidsNoPlaceInput}
            onChange={updateValueKidsNoPlace}
            defaultValue={0}
            min={0}
            max={3}
          ></input>
        </div>
      </div>
    </div>
  )
}

export default PlaceCountInputs
