import React from 'react'
import styles from './LastTicketsItem.module.css'
import WiFiIcon from '../../../shared/assets/svg/SVGR/WiFi'
import ExpressIcon from '../../../shared/assets/svg/SVGR/Express'
import FoodIcon from '../../../shared/assets/svg/SVGR/Food'
import RubleIcon from '../../../shared/assets/svg/Ruble.svg'

interface LastTicketsItemProps {
  ticket: {
    from: string
    fromRailway: string
    to: string
    toRailway: string
    price: number
    wifi: boolean
    express: boolean
    food: boolean
  }
}

const LastTicketsItem: React.FC<LastTicketsItemProps> = ({
  ticket: { from, fromRailway, to, toRailway, price, wifi, express, food },
}) => {
  return (
    <a className={styles.Ticket}>
      <div className={styles.Head}>
        <div className={styles.From}>
          <div className={styles.City}>{from}</div>
          <div className={styles.Railway}>{fromRailway}</div>
        </div>
        <div className={styles.To}>
          <div className={styles.City}>{to}</div>
          <div className={styles.Railway}>{toRailway}</div>
        </div>
      </div>
      <div className={styles.Content}>
        <div className={styles.Utils}>
          <WiFiIcon className={wifi ? styles.icon : styles.inactiveIcon} />
          <ExpressIcon className={express ? styles.icon : styles.inactiveIcon} />
          <FoodIcon className={food ? styles.icon : styles.inactiveIcon} />
        </div>
        <div className={styles.Price}>
          <p className={styles.PriceText}>от</p>
          <p className={styles.PriceValue}>{price}</p>
          <img src={RubleIcon} alt="Ruble" className={styles.RubleIcon} />
        </div>
      </div>
    </a>
  )
}

export default LastTicketsItem
