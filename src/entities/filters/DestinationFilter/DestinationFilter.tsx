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
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleDisplay = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <div
      className={classNames(isBack ? styles.DestinationFilterBack : null, styles.DestinationFilter)}
    >
      <div className={styles.head}>
        <img src={icon} className={styles.icon} alt="icon" />
        <h1 className={styles.text}>{isBack ? 'Обратно' : 'Туда'}</h1>
        <button className={styles.toggleBtn} onClick={toggleDisplay}>
          <img className={styles.iconButton} src={isExpanded ? minus : plus} alt="toggle" />
        </button>
      </div>
      <div className={classNames(styles.sliders, { [styles.slidersHidden]: !isExpanded })}>
        <div className={styles.sliderContainer}>
          <DestinationSlider isDeparture isBack={isBack} />
        </div>
        <div className={styles.sliderContainer}>
          <DestinationSlider isDeparture={false} isBack={isBack} />
        </div>
      </div>
    </div>
  )
}

export default DestinationFilter
