import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './TicketSearch.module.css'
import { useCitiesApi } from '../../shared/API/citiesAPI'
import { useSearchContext } from '../../providers/SearchProvider/SearchContext'

import Reverse from '../../shared/assets/svg/TicketSearch/Reverse.svg'
import LocationIcon from '../../shared/assets/svg/TicketSearch/Location.svg'
import CalendarIcon from '../../shared/assets/svg/TicketSearch/Calendar.svg'
import CustomCalendar from '../CustomCalendar/CustomCalendar'
import CityDropdown from './CityDropdown/CityDropdown'

import { City } from '../../shared/types/City'

interface TicketSearchProps {
  isWide: boolean
}

const TicketSearch: React.FC<TicketSearchProps> = ({ isWide }) => {
  const { searchParams, updateSearchParams } = useSearchContext()

  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)

  const { data: fromCities } = useCitiesApi(searchParams.fromCityInput)
  const { data: toCities } = useCitiesApi(searchParams.toCityInput)

  const [showFromDropdown, setShowFromDropdown] = useState(false)
  const [showToDropdown, setShowToDropdown] = useState(false)

  const navigate = useNavigate()

  const toggleStartCalendar = () => setShowStartCalendar((prev) => !prev)
  const toggleEndCalendar = () => setShowEndCalendar((prev) => !prev)

  const handleCityBlur = (
    // Для поиска при вводе
    inputValue: string,
    cities: City[],
    updateFn: (params: any) => void,
    idKey: string
  ) => {
    const matchedCity = cities.find((city) => city.name.toLowerCase() === inputValue.toLowerCase())
    if (matchedCity) {
      updateFn({ [idKey]: matchedCity._id })
    }
  }

  const handleSearchClick = () => {
    console.log(searchParams) // Проверка контекста
    navigate('/results', { state: searchParams })
  }

  return (
    <div className={isWide ? styles.wideForm : styles.narrowForm}>
      {/* Блок "Направление" */}
      <div className={styles.formDirection}>
        <h2 className={styles.formTitle}>Направление</h2>
        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.inputField}
              placeholder="Откуда"
              value={searchParams.fromCityInput}
              onChange={(e) => {
                updateSearchParams({ fromCityInput: e.target.value, fromCityId: '' })
                setShowFromDropdown(true)
              }}
              onFocus={() => setShowFromDropdown(true)}
              onBlur={() => {
                setTimeout(() => setShowFromDropdown(false), 200)
                handleCityBlur(
                  searchParams.fromCityInput,
                  fromCities,
                  updateSearchParams,
                  'fromCityId'
                )
              }}
            />
            <img src={LocationIcon} alt="Location" className={styles.inputIcon} />
            <CityDropdown
              cities={fromCities || []}
              onSelect={(city) => {
                updateSearchParams({ fromCityInput: city.name, fromCityId: city._id })
                setShowFromDropdown(false)
              }}
              visible={showFromDropdown}
            />
          </div>

          <button className={styles.reverseButton}>
            <img src={Reverse} alt="Reverse" />
          </button>

          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.inputField}
              placeholder="Куда"
              value={searchParams.toCityInput}
              onChange={(e) => {
                updateSearchParams({ toCityInput: e.target.value, toCityId: '' })
                setShowToDropdown(true)
              }}
              onFocus={() => setShowToDropdown(true)}
              onBlur={() => {
                setTimeout(() => setShowFromDropdown(false), 200)
                handleCityBlur(searchParams.toCityInput, toCities, updateSearchParams, 'toCityId')
              }}
            />
            <img src={LocationIcon} alt="Location" className={styles.inputIcon} />
            <CityDropdown
              cities={toCities || []}
              onSelect={(city) => {
                updateSearchParams({ toCityInput: city.name, toCityId: city._id })
                setShowToDropdown(false)
              }}
              visible={showToDropdown}
            />
          </div>
        </div>
      </div>

      {/* Блок "Дата" */}
      <div className={styles.formDate}>
        <h2 className={styles.formTitle}>Дата</h2>
        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.inputField}
              placeholder="ДД/ММ/ГГ"
              value={searchParams.dateStart || ''}
              onClick={toggleStartCalendar}
              readOnly
            />
            <img src={CalendarIcon} alt="Calendar" className={styles.inputIcon} />
            {showStartCalendar && (
              <CustomCalendar
                value={searchParams.dateStart ? new Date(searchParams.dateStart) : new Date()}
                onChange={(date) => {
                  if (date instanceof Date) {
                    updateSearchParams({ dateStart: date.toLocaleDateString('ru-RU') })
                  } else if (Array.isArray(date) && date[0] instanceof Date) {
                    updateSearchParams({ dateStart: date[0].toLocaleDateString('ru-RU') })
                  }
                  setShowStartCalendar(false)
                }}
              />
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.inputField}
              placeholder="ДД/ММ/ГГ"
              value={searchParams.dateEnd || ''}
              onClick={toggleEndCalendar}
              readOnly
            />
            <img src={CalendarIcon} alt="Calendar" className={styles.inputIcon} />
            {showEndCalendar && (
              <CustomCalendar
                value={searchParams.dateEnd ? new Date(searchParams.dateEnd) : new Date()}
                onChange={(date) => {
                  if (date instanceof Date) {
                    updateSearchParams({ dateEnd: date.toLocaleDateString('ru-RU') })
                  } else if (Array.isArray(date) && date[0] instanceof Date) {
                    updateSearchParams({ dateEnd: date[0].toLocaleDateString('ru-RU') })
                  }
                  setShowEndCalendar(false)
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Кнопка поиска */}
      <button
        className={`${styles.searchButton} ${isWide ? undefined : styles.searchButtonNarrow}`}
        onClick={handleSearchClick}
      >
        Найти билеты
      </button>
    </div>
  )
}

export default TicketSearch
