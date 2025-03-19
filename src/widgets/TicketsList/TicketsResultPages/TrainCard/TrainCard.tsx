import React from 'react'
import styles from './TrainCard.module.css'
import TrainTicket from '../../../../shared/assets/svg/TrainTicket.svg'
import { RouteItem } from '../../../../shared/types/RoutesResponse'
import { useSearchContext } from '../../../../providers/SearchProvider/SearchContext'

const TrainCard = (ticket: RouteItem) => {
  const { searchParams } = useSearchContext()

  function capitalizeCityName(cityName: string): string {
    if (!String) return ''
    return cityName
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('-')
  }

  console.log('Ticket Data:', ticket)
  console.log('departure To City Name:', ticket.departure?.to?.city?.name)

  return (
    <div className={styles.trainCard}>
      <div className={styles.train}>
        <div className={styles.iconContainer}>
          <img className={styles.trainIcon} src={TrainTicket} alt="Train Ticket" />
        </div>
        <p className={styles.trainName}>{ticket.departure?.train?.name}</p>
        <div className={styles.destinationsGroup}>
          {ticket.departure?.from?.city?._id !== searchParams.from_city_id && (
            <p className={styles.firstArrivalCity}>
              {capitalizeCityName(ticket.departure?.from?.city?.name) ?? ''} &rarr;
            </p>
          )}
          <p className={styles.arrivalCity}>
            {capitalizeCityName(searchParams.from_city_input)} &rarr;
          </p>
          <p className={styles.destinationCity}>{capitalizeCityName(searchParams.to_city_input)}</p>
          {ticket.departure?.to?.city?._id !== searchParams.to_city_id && (
            <p className={styles.lastDestinationCity}>
              &rarr; {capitalizeCityName(ticket.departure?.to?.city?.name) ?? ''}
            </p>
          )}
        </div>
      </div>
      <div className={styles.directions}></div>
      <div className={styles.places}></div>
    </div>
  )
}

export default TrainCard

// {
//     "have_first_class": false,
//     "have_second_class": false,
//     "have_third_class": false,
//     "have_fourth_class": false,
//     "have_wifi": false,
//     "have_air_conditioning": false,
//     "is_express": false,
//     "min_price": 697,
//     "available_seats": 112,
//     "available_seats_info": {
//       "first": 18,
//       "second": 32,
//       "fourth": 62
//     },
//     "departure": {
//       "_id": "67ceb6828c75f00047c923bf",
//       "have_first_class": true,
//       "have_second_class": true,
//       "have_third_class": false,
//       "have_fourth_class": true,
//       "have_wifi": true,
//       "have_air_conditioning": true,
//       "is_express": false,
//       "min_price": 697,
//       "duration": 261000,
//       "available_seats": 112,
//       "available_seats_info": {
//         "first": 18,
//         "second": 32,
//         "fourth": 62
//       },
//       "train": {
//         "_id": "67ceb6598c75f00047c9021c",
//         "name": "Калина - 71"
//       },
//       "from": {
//         "railway_station_name": "Балаково",
//         "city": {
//           "_id": "67ceb6548c75f00047c8f796",
//           "name": "балаково"
//         },
//         "datetime": 1704895926
//       },
//       "to": {
//         "railway_station_name": "Ладожский",
//         "city": {
//           "_id": "67ceb6548c75f00047c8f78e",
//           "name": "санкт-петербург"
//         },
//         "datetime": 1705156926
//       },
//       "price_info": {
//         "first": {
//           "price": 4330,
//           "top_price": 3350,
//           "bottom_price": 3210
//         },
//         "second": {
//           "top_price": 2178,
//           "bottom_price": 2568
//         },
//         "fourth": {
//           "top_price": 958,
//           "bottom_price": 697
//         }
//       }
//     }
//   }
