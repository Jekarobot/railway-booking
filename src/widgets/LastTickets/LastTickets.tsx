import React from 'react'
import styles from './LastTickets.module.css'
import LastTicketsItem from './LastTicketsItem/LastTicketsItem'
import useRoutesLastApi from '../../shared/API/routesLastAPI'

const LastTickets: React.FC = () => {
  const { data } = useRoutesLastApi()

  // console.log(`useRoutesLastApi: ${JSON.stringify(data, null, 2)}`)

  if (!Array.isArray(data) || data.length === 0) {
    return
  }

  return (
    <div className={styles.LastTickets}>
      <h1 className={styles.text}>Последние билеты</h1>
      <LastTicketsItem ticket={data[0]} />
      <LastTicketsItem ticket={data[1]} />
      <LastTicketsItem ticket={data[2]} />
    </div>
  )
}

export default LastTickets
