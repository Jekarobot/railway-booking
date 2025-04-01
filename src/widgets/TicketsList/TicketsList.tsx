import React, { useState } from 'react'
import styles from './TicketsList.module.css'
import TicketsResultFilters from './TicketsResultFilters/TicketsResultFilters'
import TicketsResultPages from './TicketsResultPages/TicketsResultPages'
import TicketsNavigation from './TicketsNavigation/TicketsNavigation'
import TicketDetails from './TicketDetails/TicketDetails'
import { useSearchContext } from '../../providers/SearchProvider/SearchContext'
import { Routes } from '../../shared/types/Routes'
import { RouteItem } from '../../shared/types/RoutesResponse'

const TicketsList: React.FC = () => {
  const { updateSearchParams, routesResponse, searchParams } = useSearchContext()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTicket, setSelectedTicket] = useState<RouteItem | null>(null)

  const founded = routesResponse?.total_count || 0

  const handleFilterChange = (newFilters: Partial<Routes>) => {
    const limit = newFilters.limit ?? searchParams.limit ?? 5
    const offset = limit * (currentPage - 1)
    updateSearchParams({ ...newFilters, offset })
    setCurrentPage(1)
  }
  return (
    <div className={styles.ticketsList}>
      {selectedTicket ? (
        <TicketDetails ticket={selectedTicket} onBack={() => setSelectedTicket(null)} />
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
          <TicketsResultPages tickets={routesResponse?.items} onSelectTicket={setSelectedTicket} />
          <TicketsNavigation />
        </>
      )}
    </div>
  )
}

export default TicketsList
