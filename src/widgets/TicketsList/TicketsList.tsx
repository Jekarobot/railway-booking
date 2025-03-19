import React, { useState } from 'react'
import styles from './TicketsList.module.css'
import TicketsResultFilters from './TicketsResultFilters/TicketsResultFilters'
import TicketsResultPages from './TicketsResultPages/TicketsResultPages'
import { useSearchContext } from '../../providers/SearchProvider/SearchContext'
import { Routes } from '../../shared/types/Routes'

const TicketsList: React.FC = () => {
  const { updateSearchParams, routesResponse, searchParams } = useSearchContext()
  const [currentPage, setCurrentPage] = useState(1)

  const founded = routesResponse?.total_count || 0

  const handleFilterChange = (newFilters: Partial<Routes>) => {
    const limit = newFilters.limit ?? searchParams.limit ?? 5
    const offset = limit * (currentPage - 1)
    updateSearchParams({ ...newFilters, offset })
    setCurrentPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <div className={styles.ticketsList}>
      <TicketsResultFilters
        onFilterChange={handleFilterChange}
        founded={founded}
        currentFilters={{
          limit: searchParams.limit,
          sort: searchParams.sort,
        }}
      />
      <TicketsResultPages tickets={routesResponse?.items} />
      {/* <TicketsNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  )
}

export default TicketsList
