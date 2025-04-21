import styles from './HowItWorksSection.module.css'
import PC from '../../shared/assets/svg/HowItWorks/PC.svg'
import Building from '../../shared/assets/svg/HowItWorks/Building.svg'
import World from '../../shared/assets/svg/HowItWorks/World.svg'
import { usePopup } from '../../providers/PopupProvider/PopupContext'

const AboutSection = () => {
  const { setShowPopup, setPopupType, setHeader, setContent } = usePopup()

  const handlePopup = () => {
    setPopupType('info')
    setHeader('Как это работает')
    setContent(
      'Покупать жд билеты дешево можно за 90 суток до отправления поезда. Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.'
    )
    setShowPopup(true)
  }

  return (
    <div className={styles.howItWorks} id="how-it-works">
      <div className={styles.head}>
        <h1 className={styles.head__header}>Как это работает</h1>
        <button className={styles.head__btn} onClick={handlePopup}>
          Узнать больше
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.content__group}>
          <img src={PC} className={styles.content__group__icon} />
          <p className={styles.content__group__text}>Удобный заказ на сайте</p>
        </div>
        <div className={styles.content__group}>
          <img src={Building} className={styles.content__group__icon} />
          <p className={styles.content__group__text}>Нет необходимости ехать в офис</p>
        </div>
        <div className={styles.content__group}>
          <img src={World} className={styles.content__group__icon} />
          <p className={styles.content__group__text}>Огромный выбор направлений</p>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
