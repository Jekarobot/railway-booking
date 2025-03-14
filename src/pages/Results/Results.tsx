import React, { useState } from 'react'
import styles from './Results.module.css'
import Header from '../../shared/ui/Header/Header'
import Footer from '../../shared/ui/Footer/Footer'
import TicketSearch from '../../features/TicketSearch/TicketSearch'
import ProgressBar from '../../shared/ui/ProgressBar/ProgressBar'
import RenderStep from './RenderStep/RenderStep'

const Results: React.FC = () => {
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
      <RenderStep step={step} />
      <Footer />
    </div>
  )
}

export default Results
