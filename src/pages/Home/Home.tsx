import styles from './Home.module.css'
import Header from '../../shared/ui/Header/Header'
import Footer from '../../shared/ui/Footer/Footer'
import TicketSearch from '../../feautures/TicketSearch/TicketSearch'
import AboutSection from '../../widgets/AboutSection/AboutSection'
import HowItWorksSection from '../../widgets/HowItWorksSection/HowItWorksSection'
import FeedbackSection from '../../widgets/FeedbackSection/FeedbackSection'

const Home = () => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <Header />
        <div className={styles.headerContent}>
          <div className={styles.headingContainer}>
            <h1 className={styles.firstHeading}>Вся жизнь - </h1>
            <h1 className={styles.secondHeading}>путешествие!</h1>
          </div>
          <TicketSearch isWide />
        </div>
        <div className={styles.loading}></div>
      </header>
      <main className={styles.main}>
        <section className={styles.container} id="about">
          <AboutSection />
        </section>

        <HowItWorksSection />

        <section className={styles.container} id="feedback">
          <FeedbackSection />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
