import React from 'react'
import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  activeStep: number
  setActiveStep: (step: number) => void
}

const ProgressBar: React.FC<ProgressBarProps> = ({ activeStep, setActiveStep }) => {
  return (
    <div className={styles.progressBar}>
      <div className={`${styles.step} ${styles.step1} ${activeStep >= 1 ? styles.active : ''}`}>
        <h1 className={styles.number}>1</h1>
        <p className={styles.text}>Билеты</p>
      </div>
      <div className={`${styles.step} ${styles.step2} ${activeStep >= 2 ? styles.active : ''}`}>
        <h1 className={styles.number}>2</h1>
        <p className={styles.text}>Пассажиры</p>
      </div>
      <div className={`${styles.step} ${styles.step3} ${activeStep >= 3 ? styles.active : ''}`}>
        <h1 className={styles.number}>3</h1>
        <p className={styles.text}>Оплата</p>
      </div>
      <div className={`${styles.step} ${styles.step4} ${activeStep >= 4 ? styles.active : ''}`}>
        <h1 className={styles.number}>4</h1>
        <p className={styles.text}>Проверка</p>
      </div>
    </div>
  )
}

export default ProgressBar
