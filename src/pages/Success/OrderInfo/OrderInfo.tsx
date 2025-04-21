import React, { useState } from 'react'
import styles from './OrderInfo.module.css'
import { useOrder } from '../../../providers/OrderBuildProvider/OrderContext'
import { useSearchContext } from '../../../providers/SearchProvider/SearchContext'
import { useNavigate } from 'react-router-dom'

import RubleIcon from '../../../shared/assets/svg/Ruble.svg'
import TipLogo1 from '../../../shared/assets/svg/SuccessLogos/TipLogo1.svg'
import TipLogo2 from '../../../shared/assets/svg/SuccessLogos/TipLogo2.svg'
import TipLogo3 from '../../../shared/assets/svg/SuccessLogos/TipLogo3.svg'

import Star from '../../../shared/assets/svg/SVGR/Star'

const OrderInfo: React.FC = () => {
  const { resetSearchParameters } = useSearchContext()
  const { order, updateOrder, price } = useOrder()
  const stars = Array.from({ length: 5 }, (_, index) => index)
  const [activeStars, setActiveStars] = useState(-1)

  const navigate = useNavigate()

  const handleStarClick = (index: number) => {
    if (index === activeStars) {
      setActiveStars(-1)
    } else {
      setActiveStars(index)
    }
  }

  const handleToStartClick = () => {
    resetSearchParameters()
    updateOrder({
      user: {
        first_name: '',
        last_name: '',
        patronymic: '',
        phone: '',
        email: '',
        payment_method: 'online',
      },
      departure: {
        route_direction_id: '',
        seats: [],
      },
      arrival: {
        route_direction_id: '',
        seats: [],
      },
    })
    navigate('/')
  }

  return (
    <div className={styles.orderInfo}>
      <div className={styles.head}>
        <p className={styles.title}>№Заказа 285АА</p>
        <div className={styles.priceContainer}>
          <p className={styles.priceText}>сумма</p>
          <p className={styles.price}>{price}</p>
          <img src={RubleIcon} className={styles.rubleIcon}></img>
        </div>
      </div>
      <div className={styles.tipsContainer}>
        <div className={styles.tipGroup}>
          <img src={TipLogo1} className={styles.tipLogo}></img>
          <p className={styles.tipText}>билеты будут отправлены на ваш e-mail</p>
        </div>
        <div className={styles.tipGroup}>
          <img src={TipLogo2} className={styles.tipLogo}></img>
          <p className={styles.tipText}>распечатайте и сохраняйте билеты до даты поездки</p>
        </div>
        <div className={styles.tipGroup}>
          <img src={TipLogo3} className={styles.tipLogo}></img>
          <p className={styles.tipText}>предьявите распечатанные билеты при посадке</p>
        </div>
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.name}>
          {order.user.first_name} {order.user.patronymic}!
        </h1>
        <p className={styles.textSuccess}>
          Ваш заказ успешно оформлен. <br /> В ближайшее время с вами свяжется наш оператор для
          подтверждения.
        </p>
        <p className={styles.textThanks}>
          Благодарим Вас за оказанное доверие и желаем приятного путешествия!
        </p>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.ratingContainer}>
          <p className={styles.ratingText}>Оценить сервис</p>
          <div className={styles.starsContainer}>
            {stars.map((star) => (
              <button key={star} onClick={() => handleStarClick(star)}>
                <Star
                  className={`${styles.starButton} ${star <= activeStars ? styles.activeStar : ''}`}
                />
              </button>
            ))}
          </div>
        </div>
        <button className={styles.toStartBtn} onClick={handleToStartClick}>
          Вернуться на главную
        </button>
      </div>
    </div>
  )
}

export default OrderInfo
