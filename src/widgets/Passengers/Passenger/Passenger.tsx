import { useState } from 'react'
import styles from './Passenger.module.css'
import { useOrder } from '../../../providers/OrderBuildProvider/OrderContext'
import { Seat } from '../../../shared/types/Order'
import plus from '../../../shared/assets/svg/Passenger/Plus.svg'
import minus from '../../../shared/assets/svg/Passenger/Minus.svg'
import cross from '../../../shared/assets/svg/Passenger/Cross.svg'
import { usePassengerValidation } from '../../../shared/hooks/usePassengerValidation'
import PassengerTypeSelect from './PassengerTypeSelect/PassengerTypeSelect'
import NameInput from './NameInput/NameInput'
import GenderAndBirthDate from './GenderAndBirthDate/GenderAndBirthDate'
import DocumentInput from './DocumentInput/DocumentInput'
import ErrorLogo from '../../../shared/assets/svg/ErrorLogo.svg'
import AccessLogo from '../../../shared/assets/svg/AccessLogo.svg'

interface PassengerProps {
  passengerID: string
  seat: Seat
  index: number
  activePassenger: (string | undefined)[]
  toggleActivePassenger: (seatId: string) => void
  isDeparture: boolean
}

const Passenger = ({
  passengerID,
  seat,
  activePassenger,
  toggleActivePassenger,
  index,
  isDeparture,
}: PassengerProps) => {
  const { order, updateOrder, setPassengerAge, removePassenger } = useOrder()
  const { validate, errorMessage, wrongInput } = usePassengerValidation()

  const [isAdult, setIsAdult] = useState(!seat.is_child)
  const [isSelectedPassport, setisSelectedPassport] = useState(true)
  const [gender, setGender] = useState(true)
  const [isLimitedMobility, setIsLimitedMobility] = useState(false)
  const [isValidationSuccessful, setIsValidationSuccessful] = useState(false)

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    patronymic: '',
    birthday: '',
    passportSeries: '',
    passportNumber: '',
    birthCertificate: '',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const handleSelectChangeChild = (value: string) => {
    const isChildValue = value === 'child'
    setPassengerAge(isDeparture, seat.seat_id, isChildValue)
    setIsAdult(isChildValue)
  }

  const handleSelectChangeDocument = (value: boolean) => {
    setisSelectedPassport(value)
  }

  const handleGenderChange = (isMale: boolean) => {
    setGender(isMale)
  }

  const handleLimitedMobilityChange = () => {
    setIsLimitedMobility(!isLimitedMobility)
  }

  const handleNextPassenger = () => {
    const isValid = validate({
      ...formData,
      isSelectedPassport,
    })

    setIsValidationSuccessful(isValid)
    if (!isValid) return

    // Сохраняем данные пассажира в order
    updateOrder((prev) => {
      const section = isDeparture ? 'departure' : 'arrival'
      const seats = prev[section]?.seats.map((s) =>
        s.seat_id === seat.seat_id
          ? {
              ...s,
              person_info: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                patronymic: formData.patronymic,
                gender,
                birthday: formData.birthday,
                is_adult: isAdult,
                document_type: isSelectedPassport ? 'passport' : 'birth_certificate',
                document_data: isSelectedPassport
                  ? `${formData.passportSeries} ${formData.passportNumber}`
                  : formData.birthCertificate,
              },
            }
          : s
      )

      return {
        ...prev,
        [section]: {
          ...prev[section],
          seats,
        },
      }
    })

    // Открываем следующего пассажира
    const allSeats = [...(order.departure?.seats || []), ...(order.arrival?.seats || [])]
    const currentIndex = allSeats.findIndex((s) => s.seat_id === seat.seat_id)
    const nextSeat = allSeats[currentIndex + 1]

    if (nextSeat) {
      if (!activePassenger.includes(nextSeat.seat_id)) {
        toggleActivePassenger(nextSeat.seat_id)
      }

      const nextElem = document.getElementById(`passenger-${nextSeat.seat_id}`)
      nextElem?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const isActive = activePassenger.includes(seat.seat_id)

  return (
    <div
      id={`passenger-${seat.seat_id}`}
      className={`${styles[passengerID]} ${styles.passengerMain}`}
    >
      <div className={`${styles.headContainer} ${isActive ? styles.headContainerActive : ''}`}>
        <button className={styles.hideButton} onClick={() => toggleActivePassenger(seat.seat_id)}>
          <div
            className={`${styles.buttonImgContainer} ${isActive ? styles.buttonImgContainerActive : ''}`}
          >
            <img src={isActive ? minus : plus} className={styles.buttonImg} alt="Active" />
          </div>
        </button>
        <p className={styles.headText}>
          Пассажир {index + 1} {isDeparture ? 'возвращение' : ''}
        </p>
        <button
          className={styles.deleteBtn}
          onClick={() => removePassenger(isDeparture, seat.seat_id)}
        >
          <img src={cross} className={isActive ? styles.cross : styles.crossHidden}></img>
        </button>
      </div>
      <div className={`${styles.passengerInfo} ${isActive ? '' : styles.passengerInfoHidden}`}>
        <div className={styles.mainPassengerInfo}>
          <PassengerTypeSelect isAdult={isAdult} onChange={handleSelectChangeChild} />
          <div className={styles.nameContainer}>
            <NameInput
              label="Фамилия"
              value={formData.lastName}
              wrongInput={wrongInput}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              fieldName="lastName"
            />
            <NameInput
              label="Имя"
              value={formData.firstName}
              wrongInput={wrongInput}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              fieldName="firstName"
            />
            <NameInput
              label="Отчество"
              value={formData.patronymic}
              wrongInput={wrongInput}
              onChange={(e) => handleInputChange('patronymic', e.target.value)}
              fieldName="patronymic"
            />
          </div>
          <GenderAndBirthDate
            gender={gender}
            onGenderChange={handleGenderChange}
            birthday={formData.birthday}
            wrongInput={wrongInput}
            onBirthdayChange={(e) => handleInputChange('birthday', e.target.value)}
            fieldName="birthday"
          />
          <div className={styles.invalidContainer}>
            <input
              type="checkbox"
              className={styles.invalidButton}
              checked={isLimitedMobility}
              onChange={handleLimitedMobilityChange}
            />
            <p className={styles.invalidText}>ограниченная подвижность</p>
          </div>
        </div>
        <DocumentInput
          isSelectedPassport={isSelectedPassport}
          onDocumentTypeChange={handleSelectChangeDocument}
          passportSeries={formData.passportSeries}
          onPassportSeriesChange={(e) => handleInputChange('passportSeries', e.target.value)}
          passportNumber={formData.passportNumber}
          onPassportNumberChange={(e) => handleInputChange('passportNumber', e.target.value)}
          birthCertificate={formData.birthCertificate}
          onBirthCertificateChange={(e) => handleInputChange('birthCertificate', e.target.value)}
          wrongInput={wrongInput}
        />
        <div
          className={`${styles.nextBtnContainer} ${errorMessage ? styles.nextBtnContainerRed : ''} ${isValidationSuccessful ? styles.nextBtnContainerGreen : ''}`}
        >
          {errorMessage && (
            <p className={styles.error}>
              <img src={ErrorLogo}></img>
              {errorMessage}
            </p>
          )}
          {isValidationSuccessful && (
            <p className={styles.success}>
              <img src={AccessLogo}></img>
              Готово
            </p>
          )}
          <button className={`${styles.nextBtn}`} onClick={handleNextPassenger}>
            Следующий пассажир
          </button>
        </div>
      </div>
    </div>
  )
}

export default Passenger
