import React from 'react'
import styles from './ProgressBar.module.css'

interface ProgressBarProps {
  activeStep: number
  setActiveStep: (step: number) => void
}

const ProgressBar: React.FC<ProgressBarProps> = ({ activeStep, setActiveStep }) => {
  return (
    <div className={styles.progressBar}>
      <div
        className={`${styles.progressBar__step} ${styles.progressBar__step1} ${activeStep >= 1 ? styles.active : ''}`}
      >
        <h1 className={styles.progressBar__number}>1</h1>
        <p className={styles.progressBar__text}>Билеты</p>
      </div>
      <div
        className={`${styles.progressBar__step} ${styles.progressBar__step2} ${activeStep >= 2 ? styles.active : ''}`}
      >
        <h1 className={styles.progressBar__number}>2</h1>
        <p className={styles.progressBar__text}>Пассажиры</p>
      </div>
      <div
        className={`${styles.progressBar__step} ${styles.progressBar__step3} ${activeStep >= 3 ? styles.active : ''}`}
      >
        <h1 className={styles.progressBar__number}>3</h1>
        <p className={styles.progressBar__text}>Оплата</p>
      </div>
      <div
        className={`${styles.progressBar__step} ${styles.progressBar__step4} ${activeStep >= 4 ? styles.active : ''}`}
      >
        <h1 className={styles.progressBar__number}>4</h1>
        <p className={styles.progressBar__text}>Проверка</p>
      </div>
    </div>
  )
}

export default ProgressBar
