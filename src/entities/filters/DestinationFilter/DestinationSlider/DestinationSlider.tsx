import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import styles from './DestinationSlider.module.css'
import { useSearchContext } from '../../../../providers/SearchProvider/SearchContext'

interface DestinationSliderProps {
  isDeparture: boolean
  isBack: boolean
}

const MIN_TIME = 0
const MAX_TIME = 24
const STEP = 1

const formatTime = (hours: number) => {
  const hrs = Math.floor(hours)
  const mins = (hours % 1) * 60
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

const DestinationSlider: React.FC<DestinationSliderProps> = ({ isDeparture, isBack }) => {
  const { updateSearchParams } = useSearchContext()

  const [currentMin, setCurrentMin] = useState(MIN_TIME)
  const [currentMax, setCurrentMax] = useState(MAX_TIME)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const paramKeyFrom = isDeparture
        ? isBack
          ? 'end_departure_hour_from'
          : 'start_departure_hour_from'
        : isBack
          ? 'end_arrival_hour_from'
          : 'start_arrival_hour_from'
      const paramKeyTo = isDeparture
        ? isBack
          ? 'end_departure_hour_to'
          : 'start_departure_hour_to'
        : isBack
          ? 'end_arrival_hour_to'
          : 'start_arrival_hour_to'

      updateSearchParams({
        [paramKeyFrom]: currentMin,
        [paramKeyTo]: currentMax,
      })
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [currentMin, currentMax, updateSearchParams, isDeparture, isBack])

  const onChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setCurrentMin(value[0])
      setCurrentMax(value[1])
    }
  }

  return (
    <div
      className={classNames(
        isDeparture ? styles.SliderDeparture : styles.SliderArrival,
        'DestinationSlider'
      )}
    >
      <p className={isDeparture ? styles.textDeparture : styles.textArrival}>
        {isDeparture ? 'Время отбытия' : 'Время прибытия'}
      </p>
      <Slider
        min={MIN_TIME}
        max={MAX_TIME}
        range
        step={STEP}
        value={[currentMin, currentMax]}
        onChange={onChange}
      />
      <div className={styles.values}>
        <div
          className={styles.currentMinValue}
          style={{ left: `${(currentMin / MAX_TIME) * 100}%` }}
        >
          {formatTime(currentMin)}
        </div>
        <div
          className={styles.currentMaxValue}
          style={{ left: `${(currentMax / MAX_TIME) * 100}%` }}
        >
          {formatTime(currentMax)}
        </div>
      </div>
    </div>
  )
}

export default DestinationSlider
