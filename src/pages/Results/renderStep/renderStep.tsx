import React from 'react'
import styles from './renderStep.module.css'
import FilterAside from '../../../widgets/FilterAside/FilterAside'
import LastTickets from '../../../widgets/LastTickets/LastTickets'
import TicketsList from '../../../widgets/TicketsList/TicketsList'

interface RenderStepProps {
  activeStep: number
  setActiveStep: (step: number) => void
  tickets: any[]
}

const RenderStep: React.FC<RenderStepProps> = ({ activeStep }) => {
  switch (activeStep) {
    case 0:
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingBar}></div>
          <p className={styles.loadingText}>Загружаем маршруты...</p>
        </div>
      )

    case 1:
      return (
        <div className={`${styles.step1} ${styles.step}`}>
          <aside className={`${styles.step1__aside} ${styles.aside}`}>
            <FilterAside />
            <LastTickets />
          </aside>
          <main className={`${styles.main}`}>
            <TicketsList />
          </main>
        </div>
      )

    default:
      return null
  }
}

export default RenderStep
