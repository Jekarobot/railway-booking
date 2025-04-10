import React, { useState, useEffect } from 'react'
import styles from './TicketsList.module.css'
import TicketsResultFilters from './TicketsResultFilters/TicketsResultFilters'
import TicketsResultPages from './TicketsResultPages/TicketsResultPages'
import TicketsNavigation from './TicketsNavigation/TicketsNavigation'
import TicketDetails from './TicketDetails/TicketDetails'
import { useSearchContext } from '../../providers/SearchProvider/SearchContext'
import { useTrainDetails } from '../../providers/TrainDetailsProvider/TrainDetailsProvider'
import { useOrder } from '../../providers/OrderBuildProvider/OrderContext'
import { Routes } from '../../shared/types/Routes'
import { RouteItem } from '../../shared/types/RoutesResponse'

const TicketsList: React.FC = () => {
  const { updateSearchParams, routesResponse, searchParams } = useSearchContext()
  const {
    arrivalTrainId,
    departureTrainId,
    setArrivalTrainId,
    setDepartureTrainId,
    setSelectedArrivalTicket,
    setSelectedDepartureTicket,
  } = useTrainDetails()
  const { updateOrder, clearPrice } = useOrder()
  const [currentPage, setCurrentPage] = useState(1)
  const [isRouteSelected, setIsRouteSelected] = useState(false)

  useEffect(() => {
    if (arrivalTrainId || departureTrainId) {
      setIsRouteSelected(true)
    } else {
      setIsRouteSelected(false)
    }
  }, [arrivalTrainId, departureTrainId])

  const founded = routesResponse?.total_count || 0

  const handleFilterChange = (newFilters: Partial<Routes>) => {
    const limit = newFilters.limit ?? searchParams.limit ?? 5
    const offset = limit * (currentPage - 1)
    updateSearchParams({ ...newFilters, offset })
    setCurrentPage(1)
  }

  const handleSelectTicket = (ticket: RouteItem) => {
    // Проверка на наличие departure и arrival
    if (ticket.departure && ticket.departure._id) {
      setArrivalTrainId(ticket.departure._id)
      setSelectedArrivalTicket(ticket)
      updateOrder({
        arrival: {
          route_direction_id: ticket.departure._id,
          seats: [],
        },
      })
    }

    if (ticket.arrival && ticket.arrival._id) {
      // Для теста комментить это и раскоментить 3-й блок
      setDepartureTrainId(ticket.arrival._id)
      setSelectedDepartureTicket(ticket)
      updateOrder({
        departure: {
          route_direction_id: ticket.arrival._id,
          seats: [],
        },
      })
    }

    // if (ticket.departure && ticket.departure._id) {
    //   //Тестовый блок
    //   setDepartureTrainId(ticket.departure._id)
    //   setSelectedDepartureTicket(ticket)
    //   updateOrder({
    //     departure: {
    //       route_direction_id: ticket.departure._id,
    //       seats: [],
    //     },
    //   })
    // }
  } // Тут из-за бага сервера id умышленно поменяны места
  return (
    <div className={styles.ticketsList}>
      {isRouteSelected ? (
        <TicketDetails
          onBack={() => {
            setIsRouteSelected(false)
            setArrivalTrainId('')
            setDepartureTrainId('')
            setSelectedArrivalTicket(null)
            setSelectedDepartureTicket(null)
            clearPrice()
            updateOrder({
              departure: {
                route_direction_id: '',
                seats: [],
              },
              arrival: {
                route_direction_id: '',
                seats: [],
              },
            })
          }}
        />
      ) : (
        <>
          <TicketsResultFilters
            onFilterChange={handleFilterChange}
            founded={founded}
            currentFilters={{
              limit: searchParams.limit,
              sort: searchParams.sort,
            }}
          />
          <TicketsResultPages tickets={routesResponse?.items} onSelectTicket={handleSelectTicket} />
          <TicketsNavigation />
        </>
      )}
    </div>
  )
}

export default TicketsList
