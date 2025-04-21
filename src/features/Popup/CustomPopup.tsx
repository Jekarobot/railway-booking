import React from 'react'
import styles from './CustomPopup.module.css'
import popupLogo from '../../shared/assets/svg/popupLogo.svg'
import { usePopup } from '../../providers/PopupProvider/PopupContext'

export const CustomAlert: React.FC = ({}) => {
  const { showPopup, setShowPopup, header, content, popupType } = usePopup()

  return (
    <div className={`${styles.alert} ${!showPopup ? styles.hidden : ''}`}>
      <div
        className={`${styles.logoContainer} ${popupType === 'error' ? styles.errorTheme : styles.infoTheme}`}
      >
        <img src={popupLogo} alt="logo"></img>
      </div>
      <div className={styles.contentContainer}>
        <h1 className={`${styles.header}`}>{header}</h1>
        <p className={styles.text}>{content}</p>
      </div>
      <div className={styles.btnContainer}>
        <button
          className={styles.closeButton}
          onClick={() => {
            setShowPopup(false)
          }}
        >
          Понятно
        </button>
      </div>
    </div>
  )
}
