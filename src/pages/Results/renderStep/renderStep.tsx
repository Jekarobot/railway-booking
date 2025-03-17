import React from 'react'
import styles from './renderStep.module.css'
import FilterAside from '../../../widgets/FilterAside/FilterAside'
import LastTickets from '../../../widgets/LastTickets/LastTickets'
import { mockLastTickets } from '../../../shared/mockData/mockLastTickets'
import TicketsList from '../../../widgets/TicketsList/TicketsList'

interface RenderStepProps {
  activeStep: number
  setActiveStep: (step: number) => void
  tickets: any[]
}

const RenderStep: React.FC<RenderStepProps> = ({ activeStep, tickets }) => {
  switch (activeStep) {
    case 1:
      return (
        <div className={`${styles.step1} ${styles.step}`}>
          <aside className={`${styles.step1__aside} ${styles.aside}`}>
            <FilterAside />
            <LastTickets tickets={mockLastTickets} />
          </aside>
          <main className={`${styles.main}`}>
            <TicketsList tickets={tickets} />
          </main>
        </div>
      )
  }
}

export default RenderStep
