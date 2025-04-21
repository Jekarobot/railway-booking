import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Checkout.module.css'
import TrainCard from '../../entities/TrainCard/TrainCard'

import PassengersCheckout from './PassengersCheckout/PassengersCheckout'

import { useTrainDetails } from '../../providers/TrainDetailsProvider/TrainDetailsProvider'
import { useOrder } from '../../providers/OrderBuildProvider/OrderContext'
import Loader from '../../features/Loader/Loader'
import { usePopup } from '../../providers/PopupProvider/PopupContext'

interface CheckoutProps {
  setActiveStep: (step: number) => void
}

const Checkout: React.FC<CheckoutProps> = ({ setActiveStep }) => {
  const navigate = useNavigate()
  const { selectedTicket, setSelectedTicket, setArrivalTrainId, setDepartureTrainId } =
    useTrainDetails()
  const { setContent, setHeader, setPopupType, setShowPopup } = usePopup()
  const { order, clearPrice, handleOrderSubmission } = useOrder()
  const [showLoading, setShowLoading] = useState(false)

  const handleReturnToPickTrain = () => {
    setSelectedTicket(null)
    setArrivalTrainId('')
    setDepartureTrainId('')
    clearPrice()
    setActiveStep(1)
  }

  const handleReturnToChangeSeatsData = () => {
    setActiveStep(2)
  }

  const handleChangePayment = () => {
    setActiveStep(3)
  }

  const handleUploadData = async () => {
    setShowLoading(true)
    const result = await handleOrderSubmission()
    if (result?.status === true) {
      setShowLoading(false)
      navigate('/success')
    } else if (result?.status === false) {
      setShowLoading(false)
      setShowPopup(true)
      setHeader('Не удалось отправить данные')
      setContent('Не удалось отправить данные, попробуйте еще раз')
      setPopupType('error')
    }
  }

  return (
    <>
      {showLoading ? (
        <Loader />
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.trainContainer}>
            <div className={styles.headerContainer}>
              <h1 className={styles.header}>Поезд</h1>
            </div>
            <TrainCard
              ticket={selectedTicket}
              buttonType="returnToPick"
              onButtonClick={() => handleReturnToPickTrain()}
            />
          </div>
          <div className={styles.passengersContainer}>
            <div className={styles.headerContainer}>
              <h1 className={styles.header}>Пассажиры</h1>
            </div>
            <PassengersCheckout onButtonClick={handleReturnToChangeSeatsData} />
          </div>
          <div className={styles.passengersContainer}>
            <div className={styles.headerContainer}>
              <h1 className={styles.header}>Способ оплаты</h1>
            </div>
            <div className={styles.paymentContainer}>
              <div className={styles.paymentMethodContainer}>
                <p className={styles.paymentMethod}>
                  {order.user.payment_method === 'online' ? 'Онлайн' : 'Наличные'}
                </p>
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.returnButton} onClick={handleChangePayment}>
                  Изменить
                </button>
              </div>
            </div>
          </div>
          <button onClick={handleUploadData} className={styles.uploadBtn}>
            Подтвердить
          </button>
        </div>
      )}
    </>
  )
}

export default Checkout
