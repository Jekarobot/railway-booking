import React, { useState } from 'react'
import styles from './TicketsResultFilters.module.css'

interface TicketsResultFiltersProps {
  onFilterChange: (newFilters: { itemsPerPage: number; sortOrder: string }) => void
  currentFilters: { itemsPerPage: number; sortOrder: string }
  founded: number
}

const TicketsResultFilters: React.FC<TicketsResultFiltersProps> = ({
  onFilterChange,
  currentFilters,
  founded,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleItemsPerPageClick = (itemsPerPage: number) => {
    onFilterChange({ ...currentFilters, itemsPerPage })
  }

  const handleSortOrderChange = (sortOrder: string) => {
    onFilterChange({ ...currentFilters, sortOrder })
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
              {currentFilters.sortOrder === 'time'
                ? 'времени'
                : currentFilters.sortOrder === 'price'
                  ? 'стоимости'
                  : 'длительности'}
            </div>
            {isDropdownOpen && (
              <ul className={styles.optionsList}>
                <li onClick={() => handleSortOrderChange('time')}>времени</li>
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
              className={currentFilters.itemsPerPage === 5 ? styles.active : ''}
            >
              5
            </li>
            <li
              onClick={() => handleItemsPerPageClick(10)}
              className={currentFilters.itemsPerPage === 10 ? styles.active : ''}
            >
              10
            </li>
            <li
              onClick={() => handleItemsPerPageClick(20)}
              className={currentFilters.itemsPerPage === 20 ? styles.active : ''}
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
