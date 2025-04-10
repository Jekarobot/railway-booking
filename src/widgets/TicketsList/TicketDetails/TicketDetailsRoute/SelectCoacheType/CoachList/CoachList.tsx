import React, { useState } from 'react'
import styles from './CoachList.module.css'
import { useTrainDetails } from '../../../../../../providers/TrainDetailsProvider/TrainDetailsProvider'
import { Coach } from '../../../../../../shared/types/DetailsResponse'
import CoachCard from './CoachCard/CoachCard'

interface CoachListProps {
  isDeparture: boolean
  activeType: 'first' | 'second' | 'third' | 'fourth'
}

const CoachList: React.FC<CoachListProps> = ({ isDeparture, activeType }) => {
  const { arrivalSeatsData, departureSeatsData } = useTrainDetails()
  const [activeCoaches, setActiveCoaches] = useState<number[]>([0])

  const calculateCoaches = (activeType: string) => {
    const data = isDeparture ? departureSeatsData : arrivalSeatsData
    const coaches = data?.filter((item) => item.coach.class_type === activeType) || []
    return coaches
  }

  const addCoachNumbers = (coaches: { coach: Coach; seats: any[] }[]) => {
    coaches.forEach((item, index: number) => {
      item.coach.coach_number = (index + 1).toString().padStart(2, '0')
    })
    return coaches
  }

  let coaches = addCoachNumbers(calculateCoaches(activeType))

  const toggleCoach = (index: number) => {
    setActiveCoaches((prevActiveCoaches) => {
      if (prevActiveCoaches.includes(index)) {
        return prevActiveCoaches.filter((i) => i !== index)
      } else {
        return [...prevActiveCoaches, index]
      }
    })
  }

  const renderCoachButtons = (coaches: { coach: Coach; seats: any[] }[]) => {
    return coaches.map((item, index) => (
      <button
        key={item.coach._id}
        className={activeCoaches.includes(index) ? styles.activeCoachButton : styles.coachButton}
        onClick={() => toggleCoach(index)}
      >
        {item.coach.coach_number}
      </button>
    ))
  }

  const renderCoaches = (coaches: { coach: Coach; seats: any[] }[]) => {
    return coaches.map((item, index) => (
      <div
        key={item.coach._id}
        style={{ display: activeCoaches.includes(index) ? 'block' : 'none' }}
      >
        <CoachCard
          coach={item.coach}
          seats={item.seats}
          activeType={activeType}
          isDeparture={isDeparture}
        />
      </div>
    ))
  }

  return (
    <div className={styles.main}>
      <div className={styles.panel}>
        <div className={styles.mainLeft}>
          <p className={styles.text}>Вагоны</p>
          {renderCoachButtons(coaches)}
        </div>
        <p className={styles.textRight}>Нумерация вагонов начинается с головы поезда</p>
      </div>
      {renderCoaches(coaches)}
    </div>
  )
}

export default CoachList
