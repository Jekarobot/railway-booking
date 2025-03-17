import React, { useState } from 'react'
import styles from './TicketsList.module.css'
import TicketsResultFilters from './TicketsResultFilters/TicketsResultFilters'

interface TicketsListProps {
  tickets: any[]
}

const TicketsList: React.FC<TicketsListProps> = ({ tickets }) => {
  const [filters, setFilters] = useState({ itemsPerPage: 5, sortOrder: 'time' })
  const [currentPage, setCurrentPage] = useState(1)

  const founded = tickets.length

  const handleFilterChange = (newFilters: { itemsPerPage: number; sortOrder: string }) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const sortedTickets = [...tickets].sort((a, b) => {
    if (filters.sortOrder === 'time') {
      return a.time - b.time
    } else if (filters.sortOrder === 'price') {
      return a.price - b.price
    } else if (filters.sortOrder === 'duration') {
      return a.duration - b.duration
    } else {
      return 0
    }
  })

  const totalPages = Math.ceil(sortedTickets.length / filters.itemsPerPage)

  return (
    <div className={styles.ticketsList}>
      <TicketsResultFilters
        onFilterChange={handleFilterChange}
        founded={founded}
        currentFilters={filters}
      />
      {/* <TicketsResultPages
        tickets={sortedTickets}
        currentPage={currentPage}
        itemsPerPage={filters.itemsPerPage}
      />
      <TicketsNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  )
}

export default TicketsList
