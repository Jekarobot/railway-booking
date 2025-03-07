import styles from './Header.module.css'

const Header = () => {
  return (
    <section className={styles.header}>
      <div className={styles.logoContainer}>
        <a href="#" className={styles.logo}>
          Лого
        </a>
      </div>
      <nav className={styles.navContainer}>
        <ul className={styles.navList}>
          <a href="#about" className={styles.navLink}>
            О нас
          </a>
          <a href="#how-it-works" className={styles.navLink}>
            Как это работает?
          </a>
          <a href="#feedback" className={styles.navLink}>
            Отзывы
          </a>
          <a href="#contacts" className={styles.navLink}>
            Контакты
          </a>
        </ul>
      </nav>
    </section>
  )
}

export default Header
