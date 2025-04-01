import React, { useState } from 'react'
import styles from './TicketsNavigation.module.css'
import { useSearchContext } from '../../../providers/SearchProvider/SearchContext'
import NavArrow from '../../../shared/assets/svg/NavArrow.svg'

const TicketsNavigation: React.FC = () => {
  const { searchParams, updateSearchParams, routesResponse } = useSearchContext()
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = routesResponse ? Math.ceil(routesResponse.total_count / searchParams.limit) : 1

  const calculateButtons = () => {
    if (!routesResponse) return [1]
    const buttons = []

    if (totalPages <= 3) {
      // Если страниц 3 или меньше, отображаем все
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i)
      }
    } else {
      // Если страниц больше 3
      if (currentPage > 2) {
        buttons.push(1) // Первая страница
        if (currentPage > 3) {
          buttons.push('...') // Многоточие
        }
      }

      // Добавляем текущую страницу и соседние
      for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
        buttons.push(i)
      }

      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          buttons.push('...') // Многоточие
        }
        buttons.push(totalPages) // Последняя страница
      }
    }

    return buttons
  }

  const handlePageChange = (newPage: number) => {
    const limit = searchParams.limit ?? 5
    const offset = limit * (newPage - 1)
    updateSearchParams({ ...searchParams, offset })
    setCurrentPage(newPage)
  }

  return (
    <div className={styles.ticketsNavigation}>
      <button
        className={styles.oneLeftBtn}
        onClick={() => {
          currentPage !== 1 && handlePageChange(currentPage - 1)
        }}
      >
        <img src={NavArrow} alt="To First" />
      </button>
      {calculateButtons().map((button, index) => (
        <button
          key={index}
          className={button === currentPage ? styles.activeBtn : styles.pageBtn}
          onClick={() => typeof button === 'number' && handlePageChange(button)}
          disabled={button === '...'}
        >
          {button}
        </button>
      ))}
      <button
        className={styles.oneRightBtn}
        onClick={() => {
          currentPage !== totalPages && handlePageChange(currentPage + 1)
        }}
      >
        <img src={NavArrow} alt="To Last" />
      </button>
    </div>
  )
}

export default TicketsNavigation
