import React from 'react'
import styles from './Header.module.css'
import { useNavigate } from 'react-router-dom'
import { useSearchContext } from '../../../providers/SearchProvider/SearchContext'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { resetSearchParameters } = useSearchContext()

  const handleLogoClick = () => {
    resetSearchParameters()
    navigate('/')
  }

  const handleScrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } }) // Передаем, куда прокрутить
    } else {
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100) // Небольшая задержка на случай быстрого рендера
    }
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
              onClick={(e) => {
                e.preventDefault()
                handleScrollToSection('about')
              }}
            >
              О нас
            </a>
          </li>
          <li>
            <a
              className={styles.navLink}
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault()
                handleScrollToSection('how-it-works')
              }}
            >
              Как это работает
            </a>
          </li>
          <li>
            <a
              className={styles.navLink}
              href="#feedback"
              onClick={(e) => {
                e.preventDefault()
                handleScrollToSection('feedback')
              }}
            >
              Отзывы
            </a>
          </li>
          <li>
            <a
              className={styles.navLink}
              href="#contacts"
              onClick={(e) => {
                e.preventDefault()
                handleScrollToSection('contacts')
              }}
            >
              Контакты
            </a>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Header
