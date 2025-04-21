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

interface TicketsListProps {
  setActiveStep: (step: number) => void
}

const TicketsList: React.FC<TicketsListProps> = ({ setActiveStep }) => {
  const { updateSearchParams, routesResponse, searchParams } = useSearchContext()
  const {
    arrivalTrainId,
    departureTrainId,
    setArrivalTrainId,
    setDepartureTrainId,
    setSelectedTicket,
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
    setSelectedTicket(ticket)

    const hasDeparture = ticket.departure && ticket.departure._id
    const hasArrival = ticket.arrival && ticket.arrival._id

    if (hasDeparture && hasArrival) {
      // Всё в порядке, обе стороны есть
      setDepartureTrainId(ticket.departure._id)
      setArrivalTrainId(ticket.arrival._id)
      updateOrder({
        departure: {
          route_direction_id: ticket.departure._id,
          seats: [],
        },
        arrival: {
          route_direction_id: ticket.arrival._id,
          seats: [],
        },
      })
    } else if (hasDeparture) {
      // Сервер перепутал, и тут вместо departure реально arrival
      setArrivalTrainId(ticket.departure._id)
      updateOrder({
        arrival: {
          route_direction_id: ticket.departure._id,
          seats: [],
        },
      })
    } else if (hasArrival) {
      // Сервер перепутал, и тут вместо arrival реально departure
      setDepartureTrainId(ticket.arrival._id)
      updateOrder({
        departure: {
          route_direction_id: ticket.arrival._id,
          seats: [],
        },
      })
    }
  }

  return (
    <div className={styles.ticketsList}>
      {isRouteSelected ? (
        <TicketDetails
          setActiveStep={setActiveStep}
          onBack={() => {
            setIsRouteSelected(false)
            setArrivalTrainId('')
            setDepartureTrainId('')
            setSelectedTicket(null)
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
