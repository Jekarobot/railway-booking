import React, { useState } from 'react'
import styles from './Results.module.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import TicketSearch from '../../components/TicketSearch/TicketSearch'
import ProgressBar from '../../components/ProgressBar/ProgressBar'

const Results: React.FC = () => {
  const [step, setStep] = useState(1)

  const renderStep = () => {
    switch (step) {
      case 1: {
        return (
          <div className={styles.step1}>
            <aside className={styles.step1__aside}>
              {/* <FilterAside /> */}
              {/* <LastTickets /> */}
            </aside>
            <main className={styles.step1__main}>{/* <TicketsList /> */}</main>
          </div>
        )
      }
    }
  }

  return (
    <div className={styles.results}>
      <header className={styles.tickets__header}>
        <Header />
        <div className={styles.tickets__headerContent}>
          <div className={styles.tickets__headingContainer}></div>
          <TicketSearch isWide={false} />
        </div>
      </header>
      <ProgressBar activeStep={step} setActiveStep={setStep} />
      {renderStep()}
      <Footer />
    </div>
  )
}

export default Results
