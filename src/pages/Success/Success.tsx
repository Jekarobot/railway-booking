import styles from './Success.module.css'
import Header from '../../shared/ui/Header/Header'
import Footer from '../../shared/ui/Footer/Footer'
import OrderInfo from './OrderInfo/OrderInfo'

const Home = () => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>
        <h1 className={styles.text}>Благодарим Вас за заказ!</h1>
        <OrderInfo />
      </main>
      <Footer />
    </div>
  )
}

export default Home
