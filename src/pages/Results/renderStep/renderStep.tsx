import React from 'react'
import styles from './renderStep.module.css'
import FilterAside from '../../../widgets/FilterAside/FilterAside'
import LastTickets from '../../../widgets/LastTickets/LastTickets'
import TicketsList from '../../../widgets/TicketsList/TicketsList'
import DetailsAside from '../../../widgets/DetailsAside/DetailsAside'
import Passengers from '../../../widgets/Passengers/Passengers'
import Billing from '../../../widgets/Billing/Billing'

interface RenderStepProps {
  activeStep: number
  setActiveStep: (step: number) => void
  tickets: any[]
}

const RenderStep: React.FC<RenderStepProps> = ({ activeStep, setActiveStep }) => {
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
            <TicketsList setActiveStep={setActiveStep} />
          </main>
        </div>
      )

    case 2:
      return (
        <div className={`${styles.step2} ${styles.step}`}>
          <aside className={`${styles.step2__aside} ${styles.aside}`}>
            <DetailsAside />
          </aside>
          <main className={`${styles.main}`}>
            <Passengers setActiveStep={setActiveStep} />
          </main>
        </div>
      )

    case 3:
      return (
        <div className={`${styles.step3} ${styles.step}`}>
          <aside className={`${styles.step3__aside} ${styles.aside}`}>
            <DetailsAside />
          </aside>
          <main className={`${styles.main}`}>
            <Billing setActiveStep={setActiveStep} />
          </main>
        </div>
      )

    default:
      return null
  }
}

export default RenderStep
