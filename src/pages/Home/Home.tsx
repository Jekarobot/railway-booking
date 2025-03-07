import styles from './Home.module.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import TicketSearch from '../../components/TicketSearch/TicketSearch'
import AboutSection from './components/AboutSection/AboutSection'
import HowItWorksSection from './components/HowItWorksSection/HowItWorksSection'
import FeedbackSection from './components/FeedbackSection/FeedbackSection'

const Home = () => {
  return (
    <div className={styles.home}>
      <header className={styles.home__header}>
        <Header />
        <div className={styles.home__headerContent}>
          <div className={styles.home__headingContainer}>
            <h1 className={styles.home__firstHeading}>Вся жизнь - </h1>
            <h1 className={styles.home__secondHeading}>путешествие!</h1>
          </div>
          <TicketSearch isWide />
        </div>
        <div className={styles.home__loading}></div>
      </header>
      <main className={styles.home__main}>
        <section className={styles.home__container} id="about">
          <AboutSection />
        </section>

        <HowItWorksSection />

        <section className={styles.home__container} id="feedback">
          <FeedbackSection />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
