import { useState } from 'react'
import styles from './DetailsAside.module.css'
import { useTrainDetails } from '../../providers/TrainDetailsProvider/TrainDetailsProvider'
import { useOrder } from '../../providers/OrderBuildProvider/OrderContext'
import {
  capitalizeCityName,
  formatSecondsToHHMM,
  formatUnixTimestampToTime,
  formatUnixTimestampToDate,
} from '../../shared/hooks/useFormatTools.ts'
import plus from '../../shared/assets/svg/Aside/Plus.svg'
import minus from '../../shared/assets/svg/Aside/Minus.svg'
import ArrowRight from '../../shared/assets/svg/ArrowRight.svg'
import ArrowLeft from '../../shared/assets/svg/ArrowLeft.svg'
import ArrowTicketRight from '../../shared/assets/svg/ArrowTicketRight.svg'
import ArrowTicketLeft from '../../shared/assets/svg/ArrowTicketLeft.svg'
import PassengersIcon from '../../shared/assets/svg/PassengersAside.svg'
import RubleIcon from '../../shared/assets/svg/Ruble.svg'
import BigRubleIcon from '../../shared/assets/svg/BigRuble.svg'

const DetailsAside = () => {
  const [isExpandedTo, setIsExpandedTo] = useState(true)
  const [isExpandedFrom, setIsExpandedFrom] = useState(true)
  const [isExpandedPassengers, setIsExpandedPassengers] = useState(true)

  const { order, price } = useOrder()
  const { selectedTicket } = useTrainDetails()

  const toggleDisplayTo = () => {
    setIsExpandedTo((prev) => !prev)
  }

  const toggleDisplayFrom = () => {
    setIsExpandedFrom((prev) => !prev)
  }

  const toggleDisplayPassengers = () => {
    setIsExpandedPassengers((prev) => !prev)
  }

  const calculatePassengers = () => {
    let adultPassengers = 0
    let childPassengers = 0

    let adultPrice = 0
    let childPrice = 0

    if (order.arrival.seats) {
      order.arrival.seats.forEach((seat) => {
        if (seat.is_child) {
          childPassengers++
          childPrice += seat.total_price || 0
        } else {
          adultPassengers++
          adultPrice += seat.total_price || 0
        }
      })
    }

    if (order.departure.seats) {
      order.departure.seats.forEach((seat) => {
        if (!seat.is_child) {
          childPassengers++
          childPrice += seat.total_price || 0
        } else {
          adultPassengers++
          adultPrice += seat.total_price || 0
        }
      })
    }

    const passengersCalculated = {
      adultPassengers,
      childPassengers,
      adultPrice,
      childPrice,
    }

    return passengersCalculated
  }

  return (
    // Опять из-за ошибки сервера меняю местами arrival и departure
    <div className={styles.detailsAside}>
      <div className={styles.header}>
        <h1 className={styles.headerText}>Детали поездки</h1>
      </div>
      <div className={styles.toContainer}>
        <div className={styles.containerHead}>
          <img src={ArrowRight} className={styles.iconArrow} alt="icon" />
          <h2 className={styles.toText}>Туда</h2>
          <p className={styles.dateHead}>
            {formatUnixTimestampToDate(selectedTicket?.departure.from?.datetime)}
          </p>
          <button className={styles.toggleBtn} onClick={toggleDisplayTo}>
            <img className={styles.iconButton} src={isExpandedTo ? minus : plus} alt="toggle" />
          </button>
        </div>
        <div
          className={`${styles.containerMain} ${isExpandedTo ? styles.containerMainExpanded : styles.containerMainHidden}`}
        >
          <div className={styles.trainNumberContainer}>
            <p className={styles.trainNumberText}>№ Поезда</p>
            <p className={styles.trainNumber}>{selectedTicket?.departure.train.name}</p>
          </div>
          <div className={styles.trainNameContainer}>
            <p className={styles.trainNumberText}>Название</p>
            <div className={styles.trainNames}>
              <p className={styles.trainName1}>
                {capitalizeCityName(selectedTicket?.departure.from.city.name)}
              </p>
              <p className={styles.trainName2}>
                {capitalizeCityName(selectedTicket?.departure.to.city.name)}
              </p>
            </div>
          </div>
          <div className={styles.durationContainer}>
            <p className={styles.duration}>
              {formatSecondsToHHMM(selectedTicket?.departure.duration)}
            </p>
          </div>
          <div className={styles.timesContainer}>
            <p className={styles.timeFrom}>
              {formatUnixTimestampToTime(selectedTicket?.departure.from.datetime)}
            </p>
            <img className={styles.iconArrow} src={ArrowTicketRight} alt="icon" />
            <p className={styles.timeTo}>
              {formatUnixTimestampToTime(selectedTicket?.departure.to.datetime)}
            </p>
          </div>
          <div className={styles.datesContainer}>
            <p className={styles.dateFrom}>
              {formatUnixTimestampToDate(selectedTicket?.departure.from.datetime)}
            </p>
            <p className={styles.dateTo}>
              {formatUnixTimestampToDate(selectedTicket?.departure.to.datetime)}
            </p>
          </div>
          <div className={styles.citiesContainer}>
            <p className={styles.cityFrom}>
              {capitalizeCityName(selectedTicket?.departure.from.city.name)}
            </p>
            <p className={styles.cityTo}>
              {capitalizeCityName(selectedTicket?.departure.to.city.name)}
            </p>
          </div>
          <div className={styles.railwaysContainer}>
            <p className={styles.railwayFrom}>
              {selectedTicket?.departure.from.railway_station_name} <br /> вокзал
            </p>
            <p className={styles.railwayTo}>
              {selectedTicket?.departure.to.railway_station_name} <br /> вокзал
            </p>
          </div>
        </div>
      </div>
      {selectedTicket?.arrival && ( // Тут должно быть departure
        <div className={styles.fromContainer}>
          <div className={styles.containerHead}>
            <img src={ArrowLeft} className={styles.iconArrow} alt="icon" />
            <h2 className={styles.toText}>Откуда</h2>
            <p className={styles.dateHead}>
              {formatUnixTimestampToDate(selectedTicket?.departure?.from?.datetime)}
            </p>
            <button
              className={`${styles.toggleBtn} ${styles.toggleBtnDeparture}`}
              onClick={toggleDisplayFrom}
            >
              <img className={styles.iconButton} src={isExpandedTo ? minus : plus} alt="toggle" />
            </button>
          </div>
          <div
            className={`${styles.containerMain} ${isExpandedFrom ? styles.containerMainExpanded : styles.containerMainHidden}`}
          >
            <div className={styles.trainNumberContainer}>
              <p className={styles.trainNumberText}>№ Поезда</p>
              <p className={styles.trainNumber}>{selectedTicket?.departure.train.name}</p>
            </div>
            <div className={styles.trainNameContainer}>
              <p className={styles.trainNumberText}>Название</p>
              <div className={styles.trainNames}>
                <p className={styles.trainName1}>
                  {capitalizeCityName(selectedTicket?.departure.from.city.name)}
                </p>
                <p className={styles.trainName2}>
                  {capitalizeCityName(selectedTicket?.departure.to.city.name)}
                </p>
              </div>
            </div>
            <div className={styles.durationContainer}>
              <p className={styles.duration}>
                {formatSecondsToHHMM(selectedTicket?.departure.duration)}
              </p>
            </div>
            <div className={styles.timesContainer}>
              <p className={styles.timeFrom}>
                {formatUnixTimestampToTime(selectedTicket?.departure.from.datetime)}
              </p>
              <img className={styles.iconArrow} src={ArrowTicketLeft} alt="icon" />
              <p className={styles.timeTo}>
                {formatUnixTimestampToTime(selectedTicket?.departure.to.datetime)}
              </p>
            </div>
            <div className={styles.datesContainer}>
              <p className={styles.dateFrom}>
                {formatUnixTimestampToDate(selectedTicket?.departure.from.datetime)}
              </p>
              <p className={styles.dateTo}>
                {formatUnixTimestampToDate(selectedTicket?.departure.to.datetime)}
              </p>
            </div>
            <div className={styles.citiesContainer}>
              <p className={styles.cityFrom}>
                {capitalizeCityName(selectedTicket?.departure.from.city.name)}
              </p>
              <p className={styles.cityTo}>
                {capitalizeCityName(selectedTicket?.departure.to.city.name)}
              </p>
            </div>
            <div className={styles.railwaysContainer}>
              <p className={styles.railwayFrom}>
                {selectedTicket?.departure.from.railway_station_name} <br /> вокзал
              </p>
              <p className={styles.railwayTo}>
                {selectedTicket?.departure.to.railway_station_name} <br /> вокзал
              </p>
            </div>
          </div>
        </div>
      )}
      <div className={styles.passengersContainer}>
        <div className={styles.containerHead}>
          <img src={PassengersIcon} className={styles.iconArrow} alt="icon" />
          <h2 className={styles.toText}>Пассажиры</h2>
          <button className={styles.toggleBtn} onClick={toggleDisplayPassengers}>
            <img
              className={styles.iconButton}
              src={isExpandedPassengers ? minus : plus}
              alt="toggle"
            />
          </button>
        </div>
        <div
          className={`${isExpandedPassengers ? styles.containerMainExpanded : styles.containerMainHidden}`}
        >
          <div className={styles.adultContainer}>
            <p className={styles.adultCount}>
              {calculatePassengers().adultPassengers}{' '}
              {calculatePassengers().adultPassengers === 1 ? 'взрослый' : 'взрослых'}
            </p>
            <p className={styles.adultPrice}>
              {calculatePassengers().adultPrice}{' '}
              <img src={RubleIcon} className={styles.rubleIcon}></img>
            </p>
          </div>
          <div className={styles.childContainer}>
            <p className={styles.childCount}>
              {calculatePassengers().childPassengers}{' '}
              {calculatePassengers().childPassengers === 1 ? 'детский' : 'детских'}
            </p>
            <p className={styles.childPrice}>
              {calculatePassengers().childPrice}
              <img src={RubleIcon} className={styles.rubleIcon}></img>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.finalPriceContainer}>
        <h1 className={styles.finalPriceText}>ИТОГ</h1>
        <h1 className={styles.finalPrice}>
          {price} <img src={BigRubleIcon} className={styles.rubleIconFinal}></img>
        </h1>
      </div>
    </div>
  )
}

export default DetailsAside
