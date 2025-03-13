import style from './FeedbackCard.module.css'

interface FeedbackCardProps {
  pic: string
  user: string
  text: string
}

const FeedbackCard = (props: FeedbackCardProps) => {
  return (
    <div className={style.feedbackCard}>
      <img src={props.pic} alt="user" className={style.header__user} />
      <div className={style.content}>
        <h1 className={style.user}>{props.user}</h1>
        <p className={style.text}>{props.text}</p>
      </div>
    </div>
  )
}

export default FeedbackCard
