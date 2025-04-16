import React from 'react'
import styles from './TicketDetailsRoute.module.css'
import ArrowLeft from '../../../../shared/assets/svg/ArrowLeft.svg'
import ArrowRight from '../../../../shared/assets/svg/ArrowRight.svg'
import ArrowTicketRight from '../../../../shared/assets/svg/ArrowTicketRight.svg'
import ArrowTicketLeft from '../../../../shared/assets/svg/ArrowTicketLeft.svg'
import Clock from '../../../../shared/assets/svg/Clock.svg'
import TrainTicketSmall from '../../../../shared/assets/svg/SVGR/TrainTicketSmall'
import {
  capitalizeCityName,
  formatSecondsToHHMM,
  formatUnixTimestampToTime,
} from '../../../../shared/hooks/useFormatTools.ts'
import { useSearchContext } from '../../../../providers/SearchProvider/SearchContext.tsx'
import { useTrainDetails } from '../../../../providers/TrainDetailsProvider/TrainDetailsProvider.tsx'
import PlaceCountInputs from './PlaceCountInputs/PlaceCountInputs.tsx'
import SelectCoacheType from './SelectCoacheType/SelectCoacheType.tsx'

interface TicketDetailsRouteProps {
  isDeparture: boolean
  onBack: () => void
}

const TicketDetailsRoute: React.FC<TicketDetailsRouteProps> = ({ isDeparture, onBack }) => {
  const { searchParams } = useSearchContext()
  const { selectedArrivalTicket, selectedDepartureTicket } = useTrainDetails()

  const formatTimeToObject = (time: string): { hours: number; minutes: number } => {
    const [hours, minutes] = time.split(':').map(Number)
    return { hours, minutes }
  }

  return (
    <div className={styles.ticketDetailsRoute}>
      {isDeparture ? (
        <div className={styles.arrivalTicketDetails}>
          <div className={styles.btnHeadDeparture}>
            <img className={styles.arrow} src={ArrowLeft}></img>
            <button onClick={onBack} className={styles.onBack}>
              Выбрать другой поезд
            </button>
          </div>
          <div className={styles.trainDetails}>
            <div className={styles.trainMain}>
              <div className={styles.trainTicketSmallContainer}>
                <TrainTicketSmall className={styles.trainTicketSmall} />
              </div>
              <div className={styles.trainInfo}>
                <p className={styles.trainName}>
                  {selectedDepartureTicket?.departure?.train?.name}
                </p>
                <div className={styles.destinationsGroup}>
                  {selectedDepartureTicket?.departure?.from?.city?._id !==
                    searchParams.from_city_id && (
                    <p className={styles.firstArrivalCity}>
                      {capitalizeCityName(selectedDepartureTicket?.departure?.from?.city?.name) ??
                        ''}{' '}
                      &rarr;
                    </p>
                  )}
                  <p className={styles.arrivalCity}>
                    {capitalizeCityName(searchParams.from_city_input)} &rarr;
                  </p>
                  <p className={styles.destinationCity}>
                    {capitalizeCityName(searchParams.to_city_input)}
                  </p>
                  {selectedDepartureTicket?.departure?.to?.city?._id !==
                    searchParams.to_city_id && (
                    <p className={styles.lastDestinationCity}>
                      &rarr;{' '}
                      {capitalizeCityName(selectedDepartureTicket?.departure?.to?.city?.name) ?? ''}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.directions}>
              {/* Тут в данных тоже перепутаны местами departure и arrival из-за бага сервера */}
              <div className={styles.arrivalDirection__from}>
                <p className={styles.directions__landingTime}>
                  {formatUnixTimestampToTime(selectedDepartureTicket?.departure.from.datetime)}
                </p>
                <p className={styles.directions__city}>
                  {capitalizeCityName(selectedDepartureTicket?.departure.from.city?.name)}
                </p>
                <p className={styles.directions__railway}>
                  {selectedDepartureTicket?.departure.from.railway_station_name}
                </p>
              </div>
              <img className={styles.directions__arrow} src={ArrowTicketLeft} alt="Arrow Left" />
              <div className={styles.arrivalDirection__to}>
                <p className={styles.directions__landingTime}>
                  {formatUnixTimestampToTime(selectedDepartureTicket?.departure.to.datetime)}
                </p>
                <p className={styles.directions__city}>
                  {capitalizeCityName(selectedDepartureTicket?.departure.to.city?.name)}
                </p>
                <p className={styles.directions__railway}>
                  {selectedDepartureTicket?.departure.to.railway_station_name}
                </p>
              </div>
            </div>
            <div className={styles.duration}>
              <img src={Clock} className={styles.clock}></img>
              <div className={styles.duration__group}>
                <p className={styles.duration__string}>
                  {
                    formatTimeToObject(
                      formatSecondsToHHMM(selectedDepartureTicket?.departure.duration)
                    ).hours
                  }{' '}
                  часов
                </p>
                <p className={styles.duration__string}>
                  {
                    formatTimeToObject(
                      formatSecondsToHHMM(selectedDepartureTicket?.departure.duration)
                    ).minutes
                  }{' '}
                  минут
                </p>
              </div>
            </div>
          </div>
          <PlaceCountInputs isDeparture={true} />
          <SelectCoacheType isDeparture={true} />
        </div>
      ) : (
        <div className={styles.arrivalTicketDetails}>
          <div className={styles.btnHeadArrival}>
            <img className={styles.arrow} src={ArrowRight}></img>
            <button onClick={onBack} className={styles.onBack}>
              Выбрать другой поезд
            </button>
          </div>
          <div className={styles.trainDetails}>
            <div className={styles.trainMain}>
              <div className={styles.trainTicketSmallContainer}>
                <TrainTicketSmall className={styles.trainTicketSmall} />
              </div>
              <div className={styles.trainInfo}>
                <p className={styles.trainName}>{selectedArrivalTicket?.departure?.train?.name}</p>
                <div className={styles.destinationsGroup}>
                  {selectedArrivalTicket?.departure?.from?.city?._id !==
                    searchParams.from_city_id && (
                    <p className={styles.firstArrivalCity}>
                      {capitalizeCityName(selectedArrivalTicket?.departure?.from?.city?.name) ?? ''}{' '}
                      &rarr;
                    </p>
                  )}
                  <p className={styles.arrivalCity}>
                    {capitalizeCityName(searchParams.from_city_input)} &rarr;
                  </p>
                  <p className={styles.destinationCity}>
                    {capitalizeCityName(searchParams.to_city_input)}
                  </p>
                  {selectedArrivalTicket?.departure?.to?.city?._id !== searchParams.to_city_id && (
                    <p className={styles.lastDestinationCity}>
                      &rarr;{' '}
                      {capitalizeCityName(selectedArrivalTicket?.departure?.to?.city?.name) ?? ''}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.directions}>
              {/* Тут в данных тоже перепутаны местами departure и arrival из-за бага сервера */}
              <div className={styles.arrivalDirection__from}>
                <p className={styles.directions__landingTime}>
                  {formatUnixTimestampToTime(selectedArrivalTicket?.departure.from.datetime)}
                </p>
                <p className={styles.directions__city}>
                  {capitalizeCityName(selectedArrivalTicket?.departure.from.city?.name)}
                </p>
                <p className={styles.directions__railway}>
                  {selectedArrivalTicket?.departure.from.railway_station_name}
                </p>
              </div>
              <img className={styles.directions__arrow} src={ArrowTicketRight} alt="Arrow Right" />
              <div className={styles.arrivalDirection__to}>
                <p className={styles.directions__landingTime}>
                  {formatUnixTimestampToTime(selectedArrivalTicket?.departure.to.datetime)}
                </p>
                <p className={styles.directions__city}>
                  {capitalizeCityName(selectedArrivalTicket?.departure.to.city?.name)}
                </p>
                <p className={styles.directions__railway}>
                  {selectedArrivalTicket?.departure.to.railway_station_name}
                </p>
              </div>
            </div>
            <div className={styles.duration}>
              <img src={Clock} className={styles.clock}></img>
              <div className={styles.duration__group}>
                <p className={styles.duration__string}>
                  {
                    formatTimeToObject(
                      formatSecondsToHHMM(selectedArrivalTicket?.departure.duration)
                    ).hours
                  }{' '}
                  часов
                </p>
                <p className={styles.duration__string}>
                  {
                    formatTimeToObject(
                      formatSecondsToHHMM(selectedArrivalTicket?.departure.duration)
                    ).minutes
                  }{' '}
                  минут
                </p>
              </div>
            </div>
          </div>
          <PlaceCountInputs isDeparture={false} />
          <SelectCoacheType isDeparture={false} />
        </div>
      )}
    </div>
  )
}

export default TicketDetailsRoute
