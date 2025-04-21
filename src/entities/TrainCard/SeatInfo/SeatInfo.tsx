import React, { useState } from 'react'
import styles from './SeatInfo.module.css'
import RubleIcon from '../../../shared/assets/svg/Ruble.svg'

interface SeatInfoProps {
  className: string
  seatCount: number | undefined
  priceInfo:
    | {
        price?: number
        top_price?: number
        bottom_price?: number
        side_price?: number
        linens_price?: number
        wifi_price?: number
      }
    | undefined
}

const findMinValue = (obj: any): number => {
  let minValue = Infinity
  for (const key in obj) {
    if (typeof obj[key] === 'number') {
      minValue = Math.min(minValue, obj[key])
    }
  }
  return minValue
}

const SeatInfo: React.FC<SeatInfoProps> = ({ className, seatCount, priceInfo }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleMouseEnter = () => {
    setIsDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    setIsDropdownOpen(false)
  }

  return (
    <a onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.container}>
      <p className={styles.name}>{className}</p>
      <p className={styles.count}>{seatCount}</p>
      <p className={styles.from}>от</p>
      <p className={styles.price}>{findMinValue(priceInfo)}</p>
      <img src={RubleIcon} className={styles.icon} alt="Ruble Icon" />
      {isDropdownOpen && priceInfo && (
        <div className={styles.dropdown}>
          {priceInfo.top_price !== undefined && (
            <div className={styles.dropdown__container}>
              <p className={styles.name}>верхние</p>
              <p className={styles.price}>{priceInfo.top_price}</p>
              <img src={RubleIcon} className={styles.icon} alt="Ruble Icon" />
            </div>
          )}
          {priceInfo.side_price !== undefined && (
            <div className={styles.dropdown__container}>
              <p className={styles.name}>боковые</p>
              <p className={styles.price}>{priceInfo.side_price}</p>
              <img src={RubleIcon} className={styles.icon} alt="Ruble Icon" />
            </div>
          )}
          {priceInfo.bottom_price !== undefined && (
            <div className={styles.dropdown__container}>
              <p className={styles.name}>нижние</p>
              <p className={styles.price}>{priceInfo.bottom_price}</p>
              <img src={RubleIcon} className={styles.icon} alt="Ruble Icon" />
            </div>
          )}
        </div>
      )}
    </a>
  )
}

export default SeatInfo
