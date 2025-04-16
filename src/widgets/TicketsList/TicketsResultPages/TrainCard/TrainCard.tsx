import styles from './TrainCard.module.css'
import TrainTicket from '../../../../shared/assets/svg/TrainTicket.svg'
import { RouteItem } from '../../../../shared/types/RoutesResponse'
import { useSearchContext } from '../../../../providers/SearchProvider/SearchContext'
import {
  capitalizeCityName,
  formatSecondsToHHMM,
  formatUnixTimestampToTime,
} from '../../../../shared/hooks/useFormatTools.ts'
import ArrowRight from '../../../../shared/assets/svg/ArrowTicketRight.svg'
import ArrowLeft from '../../../../shared/assets/svg/ArrowTicketLeft.svg'
import SeatInfo from './SeatInfo/SeatInfo.tsx'
import WiFiIcon from '../../../../shared/assets/svg/SVGR/WiFi'
import ExpressIcon from '../../../../shared/assets/svg/SVGR/Express'
import FoodIcon from '../../../../shared/assets/svg/SVGR/Food'

const TrainCard = (ticket: RouteItem & { onSelect: () => void }) => {
  const { searchParams } = useSearchContext()

  const handleSelectSeats = () => {
    if (ticket.onSelect) {
      ticket.onSelect() // Вызываем onSelect, если он передан
    }
  }

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
      <div className={styles.directions}>
        {' '}
        {/* Тут в данных тоже перепутаны местами departure и arrival из-за бага сервера */}
        <div className={styles.arrivalDirection}>
          <div className={styles.arrivalDirection__from}>
            <p className={styles.directions__landingTime}>
              {formatUnixTimestampToTime(ticket.departure.from.datetime)}
            </p>
            <p className={styles.directions__city}>
              {capitalizeCityName(ticket.departure.from.city?.name)}
            </p>
            <p className={styles.directions__railway}>
              {ticket.departure.from.railway_station_name}
            </p>
          </div>
          <div className={styles.arrivalDirection__duration}>
            <p className={styles.directions__duration}>
              {formatSecondsToHHMM(ticket.departure.duration)}
            </p>
            <img className={styles.directions__arrow} src={ArrowRight} alt="Arrow Right" />
          </div>
          <div className={styles.arrivalDirection__to}>
            <p className={styles.directions__landingTime}>
              {formatUnixTimestampToTime(ticket.departure.to.datetime)}
            </p>
            <p className={styles.directions__city}>
              {capitalizeCityName(ticket.departure.to.city?.name)}
            </p>
            <p className={styles.directions__railway}>{ticket.departure.to.railway_station_name}</p>
          </div>
        </div>
        {ticket.arrival && (
          <div className={styles.departureDirection}>
            <div className={styles.departureDirection__from}>
              <p className={styles.directions__landingTime}>
                {formatUnixTimestampToTime(ticket.arrival.from.datetime)}
              </p>
              <p className={styles.directions__city}>
                {capitalizeCityName(ticket.arrival.from.city?.name)}
              </p>
              <p className={styles.directions__railway}>
                {ticket.arrival.from.railway_station_name}
              </p>
            </div>
            <div className={styles.arrivalDirection__duration}>
              <p className={styles.directions__duration}>
                {formatSecondsToHHMM(ticket.arrival.duration)}
              </p>
              <img className={styles.directions__arrow} src={ArrowLeft} alt="Arrow Left" />
            </div>
            <div className={styles.arrivalDirection__to}>
              <p className={styles.directions__landingTime}>
                {formatUnixTimestampToTime(ticket.arrival.to.datetime)}
              </p>
              <p className={styles.directions__city}>
                {capitalizeCityName(ticket.arrival.to.city?.name)}
              </p>
              <p className={styles.directions__railway}>{ticket.arrival.to.railway_station_name}</p>
            </div>
          </div>
        )}
      </div>
      <div className={styles.places}>
        <div>
          {ticket.departure.have_fourth_class && (
            <SeatInfo
              className="Сидячий"
              seatCount={ticket.departure.available_seats_info.fourth}
              priceInfo={ticket.departure.price_info.fourth}
            />
          )}
          {ticket.departure.have_third_class && (
            <SeatInfo
              className="Плацкарт"
              seatCount={ticket.departure.available_seats_info.third}
              priceInfo={ticket.departure.price_info.third}
            />
          )}
          {ticket.departure.have_second_class && (
            <SeatInfo
              className="Купе"
              seatCount={ticket.departure.available_seats_info.second}
              priceInfo={ticket.departure.price_info.second}
            />
          )}
          {ticket.departure.have_first_class && (
            <SeatInfo
              className="Люкс"
              seatCount={ticket.departure.available_seats_info.first}
              priceInfo={ticket.departure.price_info.first}
            />
          )}
        </div>
        <div className={styles.places__bottom}>
          <div className={styles.options}>
            <WiFiIcon className={ticket.departure.have_wifi ? styles.inactiveIcon : styles.icon} />
            <ExpressIcon
              className={ticket.departure.is_express ? styles.inactiveIcon : styles.icon}
            />
            <FoodIcon className={styles.inactiveIcon} />
          </div>
          <button className={styles.button} onClick={handleSelectSeats}>
            Выбрать места
          </button>
        </div>
      </div>
    </div>
  )
}

export default TrainCard
