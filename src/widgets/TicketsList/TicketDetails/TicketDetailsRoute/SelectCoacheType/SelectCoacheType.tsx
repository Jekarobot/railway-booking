import React, { useState } from 'react'
import styles from './SelectCoacheType.module.css'
import { useTrainDetails } from '../../../../../providers/TrainDetailsProvider/TrainDetailsProvider'
import SeatButtonIcon from '../../../../../shared/assets/svg/SVGR/SeatButton'
import PlatscartButtonIcon from '../../../../../shared/assets/svg/SVGR/PlatscartButton'
import CoupeButtonIcon from '../../../../../shared/assets/svg/SVGR/CoupeButton'
import LuxButtonIcon from '../../../../../shared/assets/svg/SVGR/LuxButton'
import CoachList from './CoachList/CoachList'

interface CoachesProps {
  isDeparture: boolean
}

const SelectCoacheType: React.FC<CoachesProps> = ({ isDeparture }) => {
  const { arrivalSeatsData, departureSeatsData } = useTrainDetails()
  let seatsData: any[] = []
  if (!isDeparture) {
    seatsData = arrivalSeatsData || []
  } else {
    seatsData = departureSeatsData || []
  }

  const renderedClasses: Record<string, boolean> = {}

  const [luxActive, setLuxActive] = useState(false)
  const [coupeActive, setCoupeActive] = useState(false)
  const [platscartActive, setPlatscartActive] = useState(false)
  const [seatActive, setSeatActive] = useState(false)

  const luxActiveHandler = () => {
    setLuxActive(!luxActive)
  }

  const coupeActiveHandler = () => {
    setCoupeActive(!coupeActive)
  }

  const platscartActiveHandler = () => {
    setPlatscartActive(!platscartActive)
  }

  const seatActiveHandler = () => {
    setSeatActive(!seatActive)
  }

  return (
    <div className={styles.main}>
      <p className={styles.header}>Тип вагона</p>
      <div className={styles.buttonContainer}>
        {seatsData.map((res) => {
          const classType = res.coach.class_type
          if (renderedClasses[classType]) {
            return null
          }
          renderedClasses[classType] = true

          switch (classType) {
            case 'first':
              return (
                <button key={classType} className={styles.coachButton} onClick={luxActiveHandler}>
                  <LuxButtonIcon className={luxActive ? styles.iconActive : styles.icon} />
                  <p className={luxActive ? styles.nameActive : styles.name}>Люкс</p>
                </button>
              )
            case 'second':
              return (
                <button key={classType} className={styles.coachButton} onClick={coupeActiveHandler}>
                  <CoupeButtonIcon className={coupeActive ? styles.iconActive : styles.icon} />
                  <p className={coupeActive ? styles.nameActive : styles.name}>Купе</p>
                </button>
              )
            case 'third':
              return (
                <button
                  key={classType}
                  className={styles.coachButton}
                  onClick={platscartActiveHandler}
                >
                  <PlatscartButtonIcon
                    className={platscartActive ? styles.iconActive : styles.icon}
                  />
                  <p className={platscartActive ? styles.nameActive : styles.name}>Плацкарт</p>
                </button>
              )
            case 'fourth':
              return (
                <button key={classType} className={styles.coachButton} onClick={seatActiveHandler}>
                  <SeatButtonIcon className={seatActive ? styles.iconActive : styles.icon} />
                  <p className={seatActive ? styles.nameActive : styles.name}>Сидячий</p>
                </button>
              )
            default:
              return null
          }
        })}
      </div>
      {luxActive && <CoachList isDeparture={isDeparture} activeType="first" />}
      {coupeActive && <CoachList isDeparture={isDeparture} activeType="second" />}
      {platscartActive && <CoachList isDeparture={isDeparture} activeType="third" />}
      {seatActive && <CoachList isDeparture={isDeparture} activeType="fourth" />}
    </div>
  )
}

export default SelectCoacheType
