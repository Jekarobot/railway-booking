import React from 'react'
import styles from './LastTicketsItem.module.css'
import WiFiIcon from '../../../shared/assets/svg/SVGR/WiFi'
import ExpressIcon from '../../../shared/assets/svg/SVGR/Express'
import FoodIcon from '../../../shared/assets/svg/SVGR/Food'
import RubleIcon from '../../../shared/assets/svg/Ruble.svg'

interface Ticket {
  departure: {
    _id: string
    have_wifi: boolean
    is_express: boolean
    min_price: number
    from: {
      railway_station_name: string
      city: {
        name: string
      }
    }
    to: {
      railway_station_name: string
      city: {
        name: string
      }
    }
  }
}

interface LastTicketsItemProps {
  ticket: Ticket
}

const LastTicketsItem: React.FC<LastTicketsItemProps> = ({ ticket }) => {
  const {
    departure: {
      have_wifi,
      is_express,
      min_price,
      from: {
        railway_station_name: fromRailway,
        city: { name: from },
      },
      to: {
        railway_station_name: toRailway,
        city: { name: to },
      },
    },
  } = ticket

  function capitalizeCityName(cityName: string): string {
    return cityName
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('-')
  }

  return (
    <a className={styles.Ticket}>
      <div className={styles.Head}>
        <div className={styles.From}>
          <div className={styles.City}>{capitalizeCityName(from)}</div>
          <div className={styles.Railway}>{fromRailway}</div>
        </div>
        <div className={styles.To}>
          <div className={styles.City}>{capitalizeCityName(to)}</div>
          <div className={styles.Railway}>{toRailway}</div>
        </div>
      </div>
      <div className={styles.Content}>
        <div className={styles.Utils}>
          <WiFiIcon className={have_wifi ? styles.icon : styles.inactiveIcon} />
          <ExpressIcon className={is_express ? styles.icon : styles.inactiveIcon} />
          <FoodIcon className={styles.inactiveIcon} />
        </div>
        <div className={styles.Price}>
          <p className={styles.PriceText}>от</p>
          <p className={styles.PriceValue}>{min_price}</p>
          <img src={RubleIcon} alt="Ruble" className={styles.RubleIcon} />
        </div>
      </div>
    </a>
  )
}

export default LastTicketsItem
