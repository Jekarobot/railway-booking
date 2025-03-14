import React, { useState } from 'react'
import DestinationSlider from './DestinationSlider/DestinationSlider'
import styles from './DestinationFilter.module.css'
import classNames from 'classnames'
import plus from '../../../shared/assets/svg/Aside/Plus.svg'
import minus from '../../../shared/assets/svg/Aside/Minus.svg'

interface DestinationFilterProps {
  icon: string
  isBack: boolean
}

const DestinationFilter: React.FC<DestinationFilterProps> = ({ icon, isBack }) => {
  const [currentDisplay, setCurrentDisplay] = useState(false)

  const toggleDisplay = () => {
    if (currentDisplay === true) {
      setCurrentDisplay(false)
    } else {
      setCurrentDisplay(true)
    }
  }

  return (
    <div
      className={classNames(isBack ? styles.DestinationFilterBack : null, styles.DestinationFilter)}
    >
      <div className={styles.head}>
        <img src={icon} className={styles.icon}></img>
        <h1 className={styles.text}>{isBack ? 'Обратно' : 'Туда'}</h1>
        <button className={styles.toggleBtn} onClick={toggleDisplay}>
          <img className={styles.iconButton} src={currentDisplay ? minus : plus}></img>
        </button>
      </div>
      <div className={classNames(styles.sliders, { [styles.slidersHidden]: !currentDisplay })}>
        <div className={styles.sliderContainer}>
          <DestinationSlider isDeparture />
        </div>
        <div className={styles.sliderContainer}>
          <DestinationSlider isDeparture={false} />
        </div>
      </div>
    </div>
  )
}

export default DestinationFilter
