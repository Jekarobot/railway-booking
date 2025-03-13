import styles from './AboutSection.module.css'

const AboutSection = () => {
  return (
    <div className={styles.home__about}>
      <h2 className={styles.home__aboutHeading}>О нас</h2>
      <div className={styles.home__aboutTextBlock}>
        <p className={styles.home__aboutText}>
          Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым
          днем <br /> все больше людей заказывают жд билеты через интернет.
        </p>
        <p className={styles.home__aboutText}>
          Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это
          делать?
          <br /> Мы расскажем о преимуществах заказа через интернет.
        </p>
        <p className={styles.home__aboutTextFat}>
          Покупать жд билеты дешево можно за 90 суток до отправления поезда.
          <br /> Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
        </p>
      </div>
    </div>
  )
}

export default AboutSection
