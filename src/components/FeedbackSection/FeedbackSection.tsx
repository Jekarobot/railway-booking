import React from 'react'
import Slider from 'react-slick'
import styles from './FeedbackSection.module.css'
import FeedbackCard from './FeedbackCard/FeedbackCard'
import User1 from '../../assets/users/user1.png'
import User2 from '../../assets/users/user2.png'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const feedbacks = [
  {
    pic: User1,
    user: 'Екатерина Вальнова',
    text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.',
  },
  {
    pic: User2,
    user: 'Евгений Стрыкало',
    text: 'СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.',
  },
]

const FeedbackSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    appendDots: (dots: React.ReactNode) => (
      <div style={{ top: '350px' }}>
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: '15px',
          height: '15px',
          borderRadius: '50%',
          backgroundColor: '#E5E5E5',
          display: 'inline-block',
          margin: '0 5px',
        }}
      ></div>
    ),
  }

  return (
    <div className={styles.home__feedback}>
      <h1 className={styles.home__feedback__header}>Отзывы</h1>
      <Slider {...settings} className={styles.home__feedback__container}>
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index} pic={feedback.pic} user={feedback.user} text={feedback.text} />
        ))}
      </Slider>
    </div>
  )
}

export default FeedbackSection
