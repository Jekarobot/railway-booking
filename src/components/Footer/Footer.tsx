import React, { useState } from 'react'
import styles from './Footer.module.css'
import Phone from '../../assets/svg/Phone.svg'
import Mail from '../../assets/svg/Mail.svg'
import Skype from '../../assets/svg/Skype.svg'
import Geo from '../../assets/svg/Geo.svg'
import Youtube from '../../assets/svg/Youtube.svg'
import In from '../../assets/svg/In.svg'
import Google from '../../assets/svg/Google.svg'
import Facebook from '../../assets/svg/Facebook.svg'
import Twitter from '../../assets/svg/Twitter.svg'
import ToTop from '../../assets/svg/ToTop.svg'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Моковая логика обработки формы
    console.log('Email:', email)
    alert(`Подписка оформлена для: ${email}`)
  }

  return (
    <footer className={styles.footer} id="contacts">
      <div className={styles.footer__contacts}>
        <div className={styles.footer__contacts__feedback}>
          <h1 className={styles.footer__title}>Свяжитесь с нами</h1>
          <div className={styles.footer__contacts__feedback__container}>
            <img src={Phone} alt="Call" className={styles.footer__logo} />
            <p className={styles.footer__text}>8(800)000 00 00</p>
          </div>
          <div className={styles.footer__contacts__feedback__container}>
            <img src={Mail} alt="Mail" className={styles.footer__logo} />
            <p className={styles.footer__text}>inbox@mail.ru</p>
          </div>
          <div className={styles.footer__contacts__feedback__container}>
            <img src={Skype} alt="Skype" className={styles.footer__logo} />
            <p className={styles.footer__text}>tu.train.tickets</p>
          </div>
          <div className={styles.footer__contacts__feedback__container}>
            <img src={Geo} alt="Location" className={styles.footer__logo} />
            <p className={styles.footer__text}>
              г. Москва
              <br /> ул. Московская 27-35
              <br /> 555 555
            </p>
          </div>
        </div>
        <div className={styles.footer__contacts__subscription}>
          <h1 className={styles.footer__title}>Подписка</h1>
          <p className={styles.footer__text}>Будьте в курсе событий</p>
          <form onSubmit={handleSubmit} className={styles.footer__form}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              className={styles.footer__input}
              required
            />

            <button type="submit" className={styles.footer__btn}>
              Отправить
            </button>
          </form>
          <h1 className={styles.footer__title}>Подписывайтесь на нас</h1>
          <div className={styles.footer__logoContainer}>
            <a href="https://www.youtube.com" target="_blank" className={styles.footer__logo}>
              <img src={Youtube} alt="Youtube" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" className={styles.footer__logo}>
              <img src={In} alt="LinkedIn" />
            </a>
            <a href="https://www.google.com" target="_blank" className={styles.footer__logo}>
              <img src={Google} alt="Google" />
            </a>
            <a href="https://www.facebook.com" target="_blank" className={styles.footer__logo}>
              <img src={Facebook} alt="Facebook" />
            </a>
            <a href="https://www.twitter.com" target="_blank" className={styles.footer__logo}>
              <img src={Twitter} alt="Twitter" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footer__panel}>
        <a href="#" className={styles.logo}>
          Лого
        </a>

        <button
          className={styles.footer__scrollToTopButton}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src={ToTop} alt="To Top" />
        </button>
        <p className={styles.footer__panel__text}>2018 WEB</p>
      </div>
    </footer>
  )
}

export default Footer
