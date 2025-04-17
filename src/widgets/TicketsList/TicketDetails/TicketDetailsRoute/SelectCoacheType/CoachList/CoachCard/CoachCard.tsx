import React, { useState } from 'react'
import styles from './CoachCard.module.css'
import { Coach, Seat } from '../../../../../../../shared/types/DetailsResponse'
import RubleIcon from '../../../../../../../shared/assets/svg/Ruble.svg'
import AirCondition from '../../../../../../../shared/assets/svg/SVGR/AirCondition'
import WiFi from '../../../../../../../shared/assets/svg/SVGR/WiFi'
import Linens from '../../../../../../../shared/assets/svg/SVGR/Linens'
import Food from '../../../../../../../shared/assets/svg/SVGR/Food'
import CoachFirstSeats from './Seats/CoachFirstSeats/CoachFirstSeats'
import CoachSecondSeats from './Seats/CoachSecondSeats/CoachSecondSeats'
import CoachThirdSeats from './Seats/CoachThirdSeats/CoachThirdSeats'
import CoachFourthSeats from './Seats/CoachFourthSeats/CoachFourthSeats.tsx'

interface CoachCardProps {
  coach: Coach
  seats: Seat[]
  activeType: 'first' | 'second' | 'third' | 'fourth'
  isDeparture: boolean
}

const CoachCard: React.FC<CoachCardProps> = ({ coach, seats, activeType, isDeparture }) => {
  const [airConditionSelected, setAirConditionSelected] = useState(false)
  const [wifiSelected, setWifiSelected] = useState(false)
  const [linensSelected, setLinensSelected] = useState(false)

  const calculatePosition = (seats: Seat[], activeType: string) => {
    if (activeType === 'second') {
      return seats.map((seat, index) => ({
        ...seat,
        isTop: index % 2 !== 0, // Чётные индексы получают isTop: true, нечётные - false
      }))
    } else if (activeType === 'third') {
      return seats.map((seat, index) => {
        if (index >= 32) {
          return {
            ...seat,
            isSide: true,
          }
        } else {
          return {
            ...seat,
            isTop: index % 2 !== 0,
          }
        }
      })
    }
    return seats
  }

  const toggleAirCondition = () => {
    setAirConditionSelected(!airConditionSelected)
  }

  const toggleWifi = () => {
    setWifiSelected(!wifiSelected)
  }

  const toggleLinens = () => {
    setLinensSelected(!linensSelected)
  }

  const calculateSeatPrice = (coach: Coach, activeType: string) => {
    let placePrices = [0, 0, 0] // [top, bottom, side]
    if (activeType === 'first' || activeType === 'fourth') {
      placePrices[0] = 0 ? coach.price : coach.top_price
      if (wifiSelected) {
        placePrices[0] += coach.wifi_price
      }
      if (airConditionSelected) {
        placePrices[0] += 100 // У кондиционера не возвращает стоимость, мокаю в 100 рублей
      }
    } else if (activeType === 'second') {
      placePrices[0] = coach.top_price
      placePrices[1] = coach.bottom_price
      if (wifiSelected) {
        placePrices[0] += coach.wifi_price
        placePrices[1] += coach.wifi_price
      }
      if (airConditionSelected) {
        placePrices[0] += 100 // У кондиционера не возвращает стоимость, мокаю в 100 рублей
        placePrices[1] += 100
      }
      if (linensSelected) {
        placePrices[0] += coach.linens_price
        placePrices[1] += coach.linens_price
      }
    } else if (activeType === 'third') {
      placePrices[0] = coach.top_price
      placePrices[1] = coach.bottom_price
      placePrices[2] = coach.side_price
      if (wifiSelected) {
        placePrices[0] += coach.wifi_price
        placePrices[1] += coach.wifi_price
        placePrices[2] += coach.wifi_price
      }
      if (airConditionSelected) {
        placePrices[0] += 100 // У кондиционера не возвращает стоимость, мокаю в 100 рублей
        placePrices[1] += 100
        placePrices[2] += 100
      }
      if (linensSelected) {
        placePrices[0] += coach.linens_price
        placePrices[1] += coach.linens_price
        placePrices[2] += coach.linens_price
      }
    }
    return placePrices
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
  }

  const seatPrices = calculateSeatPrice(coach, activeType)

  return (
    <div className={styles.coachCard}>
      <div className={styles.head}>
        <div className={styles.numberContainer}>
          <h1 className={styles.coachNumber}>{coach.coach_number}</h1>
          <h2 className={styles.coachNumberText}>вагон</h2>
        </div>
        <div className={styles.seatsContainer}>
          <div className={styles.availableSeatsContainer}>
            <p className={styles.seatsContainerTextMain}>Места</p>
            <p className={styles.seatsNumberMain}>{coach.available_seats}</p>
          </div>
          {activeType === 'second' && (
            <div>
              <div className={styles.availableTopSeatsContainer}>
                <p className={styles.seatsContainerText}>Верхние</p>
                <p className={styles.seatsNumber}>
                  {calculatePosition(seats, activeType).filter((seat) => seat.isTop).length}
                </p>
              </div>
              <div className={styles.availableBottomSeatsContainer}>
                <p className={styles.seatsContainerText}>Нижние</p>
                <p className={styles.seatsNumber}>
                  {calculatePosition(seats, activeType).filter((seat) => !seat.isTop).length}
                </p>
              </div>
            </div>
          )}
          {activeType === 'third' && (
            <div>
              <div className={styles.availableTopSeatsContainer}>
                <p className={styles.seatsContainerText}>Верхние</p>
                <p className={styles.seatsNumber}>
                  {calculatePosition(seats, activeType).filter((seat) => seat.isTop).length}
                </p>
              </div>
              <div className={styles.availableBottomSeatsContainer}>
                <p className={styles.seatsContainerText}>Нижние</p>
                <p className={styles.seatsNumber}>
                  {
                    calculatePosition(seats, activeType).filter(
                      (seat) => !seat.isTop || !seat.isSide
                    ).length
                  }
                </p>
              </div>
              <div className={styles.availableSideSeatsContainer}>
                <p className={styles.seatsContainerText}>Боковые</p>
                <p className={styles.seatsNumber}>
                  {calculatePosition(seats, activeType).filter((seat) => seat.isSide).length}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.priceContainer}>
          <p className={styles.priceText}>Стоимость</p>
          {activeType === 'second' && (
            <div>
              <div className={styles.topPriceContainer}>
                <p className={styles.price}>{seatPrices[0]}</p>
                <img src={RubleIcon} alt="Рублей" className={styles.priceIcon}></img>
              </div>
              <div className={styles.bottomPriceContainer}>
                <p className={styles.price}>{seatPrices[1]}</p>
                <img src={RubleIcon} alt="Рублей" className={styles.priceIcon}></img>
              </div>
            </div>
          )}
          {activeType === 'third' && (
            <div>
              <div className={styles.topPriceContainer}>
                <p className={styles.price}>{seatPrices[0]}</p>
                <img src={RubleIcon} alt="Рублей" className={styles.priceIcon}></img>
              </div>
              <div className={styles.bottomPriceContainer}>
                <p className={styles.price}>{seatPrices[1]}</p>
                <img src={RubleIcon} alt="Рублей" className={styles.priceIcon}></img>
              </div>
              <div className={styles.sidePriceContainer}>
                <p className={styles.price}>{seatPrices[2]}</p>
                <img src={RubleIcon} alt="Рублей" className={styles.priceIcon}></img>
              </div>
            </div>
          )}
          {(activeType === 'first' || activeType === 'fourth') && (
            <div>
              <div className={styles.topPriceContainer}>
                <p className={styles.price}>{seatPrices[0]}</p>
                <img src={RubleIcon} alt="Рублей" className={styles.priceIcon}></img>
              </div>
            </div>
          )}
        </div>
        <div className={styles.servicesContainer}>
          <div className={styles.servicesTextContainer}>
            <p className={styles.servicesText1}>Обслуживание</p>
            <p className={styles.servicesText2}>ФПК</p>
          </div>
          <div className={styles.servicesButtons}>
            {/*Для кондиционера и Wi-fi с сервера нет свойсва included, я бы сделал по аналогии c linens*/}
            {coach.have_air_conditioning && (
              <button
                className={`${airConditionSelected ? styles.buttonActive : styles.button} ${styles.airConditionButton}`}
                onClick={toggleAirCondition}
              >
                <AirCondition
                  className={airConditionSelected ? styles.buttonIconActive : styles.buttonIcon}
                />
              </button>
            )}

            {coach.have_wifi && (
              <button
                className={`${wifiSelected ? styles.buttonActive : styles.button} ${styles.WiFiButton}`}
                onClick={toggleWifi}
              >
                <WiFi className={wifiSelected ? styles.buttonIconActive : styles.buttonIcon} />
              </button>
            )}

            {activeType !== 'fourth' && (
              <button
                className={`${
                  coach.is_linens_included === true
                    ? styles.buttonIncluded
                    : linensSelected
                      ? styles.buttonActive
                      : styles.button
                } ${styles.linensButton} `}
                onClick={coach.is_linens_included ? undefined : toggleLinens}
              >
                <Linens
                  className={
                    coach.is_linens_included === true
                      ? styles.buttonIconIncluded
                      : linensSelected
                        ? styles.buttonIconActive
                        : styles.buttonIcon
                  }
                />
              </button>
            )}
            {/*Этого свойства вообще нет в ответе от сервера, поэтому по умолчанию покушац можно всегда (* ^ ω ^)*/}
            <button className={`${styles.buttonIncluded} ${styles.foodButton} `}>
              <Food className={styles.buttonIconIncluded} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.currentUsersPicks}>
        <p className={styles.currentUsersPicksText}>
          {getRandomInt(30)} человек выбирают места в этом поезде
        </p>
      </div>
      {activeType === 'first' && (
        <CoachFirstSeats
          seatPrice={calculateSeatPrice(coach, activeType)}
          seats={seats}
          coach={coach}
          isDeparture={isDeparture}
        />
      )}
      {activeType === 'second' && (
        <CoachSecondSeats
          seatPrice={calculateSeatPrice(coach, activeType)}
          seats={calculatePosition(seats, activeType)}
          coach={coach}
          isDeparture={isDeparture}
        />
      )}
      {activeType === 'third' && (
        <CoachThirdSeats
          seatPrice={calculateSeatPrice(coach, activeType)}
          seats={calculatePosition(seats, activeType)}
          coach={coach}
          isDeparture={isDeparture}
        />
      )}
      {activeType === 'fourth' && (
        <CoachFourthSeats
          seatPrice={calculateSeatPrice(coach, activeType)}
          seats={calculatePosition(seats, activeType)}
          coach={coach}
          isDeparture={isDeparture}
        />
      )}
    </div>
  )
}

export default CoachCard
