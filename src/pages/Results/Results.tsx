import React, { useState, useEffect } from 'react'
import styles from './Results.module.css'
import Header from '../../shared/ui/Header/Header'
import Footer from '../../shared/ui/Footer/Footer'
import TicketSearch from '../../features/TicketSearch/TicketSearch'
import ProgressBar from '../../shared/ui/ProgressBar/ProgressBar'
import RenderStep from './RenderStep/RenderStep'
import { useSearchContext } from '../../providers/SearchProvider/SearchContext'

const Results: React.FC = () => {
  const { loading } = useSearchContext()
  const [step, setStep] = useState(loading ? 0 : 1)

  useEffect(() => {
    if (!loading && step === 0) {
      setStep(1)
    }
  }, [loading, step])

  return (
    <div className={styles.results}>
      <header className={styles.header}>
        <Header />
        <div className={styles.headerContent}>
          <div className={styles.headingContainer}></div>
          <TicketSearch isWide={false} />
        </div>
      </header>
      <ProgressBar activeStep={step} />
      <RenderStep activeStep={step} setActiveStep={setStep} />
      <Footer />
    </div>
  )
}

export default Results
