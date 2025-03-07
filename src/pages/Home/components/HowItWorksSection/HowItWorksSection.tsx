import styles from './HowItWorksSection.module.css'
import PC from '../../../../assets/svg/PC.svg'
import Building from '../../../../assets/svg/Building.svg'
import World from '../../../../assets/svg/World.svg'

const AboutSection = () => {
  return (
    <div className={styles.home__howItWorks} id="how-it-works">
      <div className={styles.home__howItWorks__head}>
        <h1 className={styles.home__howItWorks__head__header}>Как это работает</h1>
        <button className={styles.home__howItWorks__head__btn}>Узнать больше</button>
      </div>
      <div className={styles.home__howItWorks__content}>
        <div className={styles.home__howItWorks__content__group}>
          <img src={PC} className={styles.home__howItWorks__content__group__icon} />
          <p className={styles.home__howItWorks__content__group__text}>Удобный заказ на сайте</p>
        </div>
        <div className={styles.home__howItWorks__content__group}>
          <img src={Building} className={styles.home__howItWorks__content__group__icon} />
          <p className={styles.home__howItWorks__content__group__text}>
            Нет необходимости ехать в офис
          </p>
        </div>
        <div className={styles.home__howItWorks__content__group}>
          <img src={World} className={styles.home__howItWorks__content__group__icon} />
          <p className={styles.home__howItWorks__content__group__text}>
            Огромный выбор направлений
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
