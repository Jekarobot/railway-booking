import React from 'react'
import styles from './renderStep.module.css'
import FilterAside from '../../../widgets/FilterAside/FilterAside'
import LastTickets from '../../../widgets/LastTickets/LastTickets'
import { mockLastTickets } from '../../../shared/mockData/mockLastTickets'

interface RenderStepProps {
  step: number
}

const RenderStep: React.FC<RenderStepProps> = ({ step }) => {
  switch (step) {
    case 1:
      return (
        <div className={`${styles.step1} ${styles.step}`}>
          <aside className={`${styles.step1__aside} ${styles.aside}`}>
            <FilterAside />
            <LastTickets tickets={mockLastTickets} />
          </aside>
          <main className={`${styles.main}`}>{/* <TicketsList /> */}</main>
        </div>
      )
    default:
      return null
  }
}

export default RenderStep
