import React from 'react'
import styles from './Loader.module.css'
import TrainIcon from '../../shared/assets/svg/LoadingTrain.svg'

interface LoaderProps {
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ text = 'Идет поиск...' }) => {
  return (
    <div className={styles.loadingContainer}>
      <p className={styles.loadingText}>{text}</p>
      <div className={styles.loadingBar}>
        <img src={TrainIcon} className={styles.train}></img>
        <div className={styles.rails}></div>
      </div>
    </div>
  )
}

export default Loader
