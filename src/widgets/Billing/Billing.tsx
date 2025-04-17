import React, { useState, useEffect } from 'react'
import styles from './Billing.module.css'
import { useOrder } from '../../providers/OrderBuildProvider/OrderContext'

import NameInput from '../../entities/inputs/NameInput/NameInput'
import PhoneAndEmailInput from '../../entities/inputs/PhoneAndEmailInput/PhoneAndEmailInput'

import { useOrderFormValidation } from '../../shared/hooks/useOrderFormValidation'

import { User } from '../../shared/types/Order'

interface BillingProps {
  setActiveStep: (step: number) => void
}

const Billing: React.FC<BillingProps> = ({ setActiveStep }) => {
  const { validate, wrongInput } = useOrderFormValidation()
  const { updateOrder } = useOrder()

  const [payType, setPayType] = useState<'cash' | 'online'>('online')
  const [isFormValid, setIsFormValid] = useState(false)

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    patronymic: '',
    phone: '',
    email: '',
    payment_method: payType,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const handlePayTypeChange = (type: 'cash' | 'online') => {
    setPayType(type)
    setFormData((prevData) => ({
      ...prevData,
      payment_method: type,
    }))
  }

  useEffect(() => {
    const isUserInfoComplete = (userInfo: User) => {
      return (
        userInfo.first_name.trim() !== '' &&
        userInfo.last_name.trim() !== '' &&
        userInfo.patronymic.trim() !== '' &&
        userInfo.payment_method.trim() !== '' &&
        userInfo.phone.trim() !== '' &&
        userInfo.email.trim() !== ''
      )
    }

    if (isUserInfoComplete(formData)) {
      setIsFormValid(validate(formData))
    } else {
      setIsFormValid(false)
    }
  }, [formData, validate])

  const handleNextStep = () => {
    if (isFormValid) {
      updateOrder((prev) => {
        return {
          ...prev,
          user: { ...formData },
        }
      })
      setActiveStep(4)
    } else {
      alert('Пожалуйста, заполните все обязательные поля.')
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.billingMain}>
        <div className={styles.headerContainerFirst}>
          <h1 className={styles.header}>Персональные данные</h1>
        </div>
        <div className={styles.inputs}>
          <div className={styles.nameContainer}>
            <NameInput
              label="Фамилия"
              value={formData.last_name}
              wrongInput={wrongInput}
              onChange={(e) => handleInputChange('last_name', e.target.value)}
              fieldName="last_name"
            />
            <NameInput
              label="Имя"
              value={formData.first_name}
              wrongInput={wrongInput}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
              fieldName="first_name"
            />
            <NameInput
              label="Отчество"
              value={formData.patronymic}
              wrongInput={wrongInput}
              onChange={(e) => handleInputChange('patronymic', e.target.value)}
              fieldName="patronymic"
            />
          </div>
          <div className={styles.phoneAndEmailContainer}>
            <PhoneAndEmailInput
              phone={formData.phone}
              onPhoneChange={(e) => handleInputChange('phone', e.target.value)}
              email={formData.email}
              onEmailChange={(e) => handleInputChange('email', e.target.value)}
              wrongInput={wrongInput}
            />
          </div>
        </div>
        <div className={styles.headerContainerSecond}>
          <h1 className={styles.header}>Способ оплаты</h1>
        </div>
        <div className={styles.paymentContainer}>
          <div
            className={`${styles.paymentMethodContainer} ${styles.paymentMethodContainerOnline}`}
          >
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                className={styles.paymentCheckbox}
                checked={payType === 'online'}
                onChange={() => handlePayTypeChange('online')}
              />
              <label
                className={`${styles.paymentButtonText} ${payType === 'online' ? styles.paymentButtonTextActive : ''}`}
              >
                Онлайн
              </label>
            </div>
            <div className={styles.onlinePayTypes}>
              <h2 className={styles.onlinePayType}>Банковской картой</h2>
              <h2 className={styles.onlinePayType}>PayPal</h2>
              <h2 className={styles.onlinePayType}>Visa QIWI Wallet</h2>
            </div>
          </div>
          <div className={`${styles.paymentMethodContainer}`}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                className={styles.paymentCheckbox}
                checked={payType === 'cash'}
                onChange={() => handlePayTypeChange('cash')}
              />
              <label
                className={`${styles.paymentButtonText} ${payType === 'cash' ? styles.paymentButtonTextActive : ''}`}
              >
                Наличными
              </label>
            </div>
          </div>
        </div>
      </div>
      <button
        className={`${styles.nextStep} ${isFormValid ? styles.nextStepActive : styles.nextStepNonActive}`}
        onClick={handleNextStep}
      >
        КУПИТЬ БИЛЕТЫ
      </button>
    </div>
  )
}

export default Billing
