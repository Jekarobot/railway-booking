import React, { useState } from 'react'
import styles from './Results.module.css'
import Header from '../../shared/ui/Header/Header'
import Footer from '../../shared/ui/Footer/Footer'
import TicketSearch from '../../features/TicketSearch/TicketSearch'
import ProgressBar from '../../shared/ui/ProgressBar/ProgressBar'
import RenderStep from './RenderStep/RenderStep'
import mockTickets from '../../shared/mockData/mockTickets'

const Results: React.FC = () => {
  console.log('Rendering Results component')
  const [step, setStep] = useState(1)

  return (
    <div className={styles.results}>
      <header className={styles.header}>
        <Header />
        <div className={styles.headerContent}>
          <div className={styles.headingContainer}></div>
          <TicketSearch isWide={false} />
        </div>
      </header>
      <ProgressBar activeStep={step} setActiveStep={setStep} />
      <RenderStep activeStep={step} setActiveStep={setStep} tickets={mockTickets.items} />
      <Footer />
    </div>
  )
}

export default Results
