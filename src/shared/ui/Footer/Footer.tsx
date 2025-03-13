import React, { useState } from 'react'
import styles from './Footer.module.css'
import Phone from '../../assets/svg/Footer/Phone.svg'
import Mail from '../../assets/svg/Footer/Mail.svg'
import Skype from '../../assets/svg/Footer/Skype.svg'
import Geo from '../../assets/svg/Footer/Geo.svg'
import Youtube from '../../assets/svg/Footer/Youtube.svg'
import In from '../../assets/svg/Footer/In.svg'
import Google from '../../assets/svg/Footer/Google.svg'
import Facebook from '../../assets/svg/Footer/Facebook.svg'
import Twitter from '../../assets/svg/Footer/Twitter.svg'
import ToTop from '../../assets/svg/Footer/ToTop.svg'

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
      <div className={styles.contacts}>
        <div className={styles.feedback}>
          <h1 className={styles.title}>Свяжитесь с нами</h1>
          <div className={styles.feedbackContainer}>
            <img src={Phone} alt="Call" className={styles.logo} />
            <p className={styles.text}>8(800)000 00 00</p>
          </div>
          <div className={styles.feedbackContainer}>
            <img src={Mail} alt="Mail" className={styles.logo} />
            <p className={styles.text}>inbox@mail.ru</p>
          </div>
          <div className={styles.feedbackContainer}>
            <img src={Skype} alt="Skype" className={styles.logo} />
            <p className={styles.text}>tu.train.tickets</p>
          </div>
          <div className={styles.feedbackContainer}>
            <img src={Geo} alt="Location" className={styles.logo} />
            <p className={styles.text}>
              г. Москва
              <br /> ул. Московская 27-35
              <br /> 555 555
            </p>
          </div>
        </div>
        <div className={styles.subscription}>
          <h1 className={styles.title}>Подписка</h1>
          <p className={styles.text}>Будьте в курсе событий</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              className={styles.input}
              required
            />

            <button type="submit" className={styles.btn}>
              Отправить
            </button>
          </form>
          <h1 className={styles.title}>Подписывайтесь на нас</h1>
          <div className={styles.logoContainer}>
            <a href="https://www.youtube.com" target="_blank" className={styles.logo}>
              <img src={Youtube} alt="Youtube" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" className={styles.logo}>
              <img src={In} alt="LinkedIn" />
            </a>
            <a href="https://www.google.com" target="_blank" className={styles.logo}>
              <img src={Google} alt="Google" />
            </a>
            <a href="https://www.facebook.com" target="_blank" className={styles.logo}>
              <img src={Facebook} alt="Facebook" />
            </a>
            <a href="https://www.twitter.com" target="_blank" className={styles.logo}>
              <img src={Twitter} alt="Twitter" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.panel}>
        <a href="#" className={styles.logo}>
          Лого
        </a>

        <button
          className={styles.scrollToTopButton}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src={ToTop} alt="To Top" />
        </button>
        <p className={styles.panel__text}>2018 WEB</p>
      </div>
    </footer>
  )
}

export default Footer
