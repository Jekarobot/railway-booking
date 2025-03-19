import React, { useState } from 'react'
import styles from './TicketsResultFilters.module.css'
import { Routes } from '../../../shared/types/Routes'

interface TicketsResultFiltersProps {
  onFilterChange: (newFilters: Partial<Routes>) => void
  currentFilters: { limit?: number; sort?: 'date' | 'price' | 'duration' }
  founded: number
}

const TicketsResultFilters: React.FC<TicketsResultFiltersProps> = ({
  onFilterChange,
  currentFilters,
  founded,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleItemsPerPageClick = (limit: number) => {
    onFilterChange({ ...currentFilters, limit })
  }

  const handleSortOrderChange = (sort: 'date' | 'price' | 'duration') => {
    onFilterChange({ ...currentFilters, sort })
    setIsDropdownOpen(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.founded}>найдено {founded}</div>
      <div className={styles.filters}>
        <div className={styles.sortOrder}>
          <label>Сортировать по:</label>
          <div className={styles.customSelect} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className={styles.selectedOption}>
              {currentFilters.sort === 'date'
                ? 'времени'
                : currentFilters.sort === 'price'
                  ? 'стоимости'
                  : 'длительности'}
            </div>
            {isDropdownOpen && (
              <ul className={styles.optionsList}>
                <li onClick={() => handleSortOrderChange('date')}>времени</li>
                <li onClick={() => handleSortOrderChange('price')}>стоимости</li>
                <li onClick={() => handleSortOrderChange('duration')}>длительности</li>
              </ul>
            )}
          </div>
        </div>
        <div className={styles.itemsPerPage}>
          <label>Показывать по:</label>
          <ul className={styles.itemsList}>
            <li
              onClick={() => handleItemsPerPageClick(5)}
              className={currentFilters.limit === 5 ? styles.active : ''}
            >
              5
            </li>
            <li
              onClick={() => handleItemsPerPageClick(10)}
              className={currentFilters.limit === 10 ? styles.active : ''}
            >
              10
            </li>
            <li
              onClick={() => handleItemsPerPageClick(20)}
              className={currentFilters.limit === 20 ? styles.active : ''}
            >
              20
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TicketsResultFilters
