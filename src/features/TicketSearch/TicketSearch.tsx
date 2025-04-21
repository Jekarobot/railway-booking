import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './TicketSearch.module.css'
import { useCitiesApi } from '../../shared/API/citiesAPI'
import { useSearchContext } from '../../providers/SearchProvider/SearchContext'
import { useRoutesAPI } from '../../shared/API/routesAPI'

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
  const { data: routesData } = useRoutesAPI()

  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)

  const [fromCities, setFromCities] = useState<City[]>([])
  const [toCities, setToCities] = useState<City[]>([])

  const [showFromDropdown, setShowFromDropdown] = useState(false)
  const [showToDropdown, setShowToDropdown] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchFromCities = async () => {
      const result = await useCitiesApi(searchParams.from_city_input)
      setFromCities(result.data || [])
    }
    fetchFromCities()
  }, [searchParams.from_city_input])

  useEffect(() => {
    const fetchToCities = async () => {
      const result = await useCitiesApi(searchParams.to_city_input)
      setToCities(result.data || [])
    }
    fetchToCities()
  }, [searchParams.to_city_input])

  const toggleStartCalendar = () => setShowStartCalendar((prev) => !prev)
  const toggleEndCalendar = () => setShowEndCalendar((prev) => !prev)

  const handleCityBlur = (
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
    if (searchParams.from_city_id === '' && searchParams.to_city_id === '') {
      alert('Заполните поля направлений')
      return
    }
    navigate('/results', { state: { searchParams, routesData } })
  }

  const handleReverseClick = () => {
    updateSearchParams({
      from_city_input: searchParams.to_city_input,
      from_city_id: searchParams.to_city_id,
      to_city_input: searchParams.from_city_input,
      to_city_id: searchParams.from_city_id,
    })
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
              value={searchParams.from_city_input}
              onChange={(e) => {
                updateSearchParams({ from_city_input: e.target.value, from_city_id: '' })
                setShowFromDropdown(true)
              }}
              onFocus={() => setShowFromDropdown(true)}
              onBlur={() => {
                setTimeout(() => {
                  setShowFromDropdown(false)
                  handleCityBlur(
                    searchParams.from_city_input,
                    fromCities,
                    updateSearchParams,
                    'from_city_id'
                  )
                }, 200)
              }}
            />
            <img src={LocationIcon} alt="Location" className={styles.inputIcon} />
            <CityDropdown
              cities={fromCities || []}
              onSelect={(city) => {
                updateSearchParams({ from_city_input: city.name, from_city_id: city._id })
                setShowFromDropdown(false)
              }}
              visible={showFromDropdown}
            />
          </div>

          <button className={styles.reverseButton}>
            <img src={Reverse} alt="Reverse" onClick={handleReverseClick} />
          </button>

          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.inputField}
              placeholder="Куда"
              value={searchParams.to_city_input}
              onChange={(e) => {
                updateSearchParams({ to_city_input: e.target.value, to_city_id: '' })
                setShowToDropdown(true)
              }}
              onFocus={() => setShowToDropdown(true)}
              onBlur={() => {
                setTimeout(() => {
                  setShowToDropdown(false)
                  handleCityBlur(
                    searchParams.to_city_input,
                    toCities,
                    updateSearchParams,
                    'to_city_id'
                  )
                }, 200)
              }}
            />
            <img src={LocationIcon} alt="Location" className={styles.inputIcon} />
            <CityDropdown
              cities={toCities || []}
              onSelect={(city) => {
                updateSearchParams({ to_city_input: city.name, to_city_id: city._id })
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
              value={searchParams.date_start || ''}
              onClick={toggleStartCalendar}
              readOnly
            />
            <img src={CalendarIcon} alt="Calendar" className={styles.inputIcon} />
            {showStartCalendar && (
              <CustomCalendar
                value={searchParams.date_start ? new Date(searchParams.date_start) : new Date()}
                onChange={(date) => {
                  if (date instanceof Date) {
                    updateSearchParams({ date_start: date.toLocaleDateString('ru-RU') })
                  } else if (Array.isArray(date) && date[0] instanceof Date) {
                    updateSearchParams({ date_start: date[0].toLocaleDateString('ru-RU') })
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
              value={searchParams.date_end || ''}
              onClick={toggleEndCalendar}
              readOnly
            />
            <img src={CalendarIcon} alt="Calendar" className={styles.inputIcon} />
            {showEndCalendar && (
              <CustomCalendar
                value={searchParams.date_end ? new Date(searchParams.date_end) : new Date()}
                onChange={(date) => {
                  if (date instanceof Date) {
                    updateSearchParams({ date_end: date.toLocaleDateString('ru-RU') })
                  } else if (Array.isArray(date) && date[0] instanceof Date) {
                    updateSearchParams({ date_end: date[0].toLocaleDateString('ru-RU') })
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
