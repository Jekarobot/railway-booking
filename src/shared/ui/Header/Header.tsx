import React from 'react'
import styles from './Header.module.css'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleScrollToSection = (id: string) => {
    navigate(`/#${id}`)
  }

  return (
    <section className={styles.header}>
      <div className={styles.logoContainer}>
        <a className={styles.logo} onClick={handleLogoClick}>
          Лого
        </a>
      </div>
      <nav className={styles.navContainer}>
        <ul className={styles.navList}>
          <li>
            <a
              className={styles.navLink}
              href="#about"
              onClick={() => handleScrollToSection('about')}
            >
              О нас
            </a>
          </li>
          <li>
            <a
              className={styles.navLink}
              href="#how-it-works"
              onClick={() => handleScrollToSection('how-it-works')}
            >
              Как это работает
            </a>
          </li>
          <li>
            <a
              className={styles.navLink}
              href="#feedback"
              onClick={() => handleScrollToSection('feedback')}
            >
              Отзывы
            </a>
          </li>
          <li>
            <a className={styles.navLink} href="#contacts">
              Контакты
            </a>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Header
