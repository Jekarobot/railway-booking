import styles from './AboutSection.module.css'

const AboutSection = () => {
  return (
    <div className={styles.about}>
      <h2 className={styles.aboutHeading}>О нас</h2>
      <div className={styles.aboutTextBlock}>
        <p className={styles.aboutText}>
          Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым
          днем <br /> все больше людей заказывают жд билеты через интернет.
        </p>
        <p className={styles.aboutText}>
          Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это
          делать?
          <br /> Мы расскажем о преимуществах заказа через интернет.
        </p>
        <p className={styles.aboutTextFat}>
          Покупать жд билеты дешево можно за 90 суток до отправления поезда.
          <br /> Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
        </p>
      </div>
    </div>
  )
}

export default AboutSection
