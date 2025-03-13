import style from './FeedbackCard.module.css'

interface FeedbackCardProps {
  pic: string
  user: string
  text: string
}

const FeedbackCard = (props: FeedbackCardProps) => {
  return (
    <div className={style.feedbackCard}>
      <img src={props.pic} alt="user" className={style.feedbackCard__header__user} />
      <div className={style.feedbackCard__content}>
        <h1 className={style.feedbackCard__content__user}>{props.user}</h1>
        <p className={style.feedbackCard__content__text}>{props.text}</p>
      </div>
    </div>
  )
}

export default FeedbackCard
