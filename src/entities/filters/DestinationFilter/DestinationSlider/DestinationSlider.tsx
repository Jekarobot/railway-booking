import React, { useState } from 'react'
import classNames from 'classnames'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import styles from './DestinationSlider.module.css'

interface DestinationSliderProps {
  isDeparture: boolean
}

const formatTime = (value: number) => {
  const hours = Math.floor(value / 60)
  const minutes = value % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

const DestinationSlider: React.FC<DestinationSliderProps> = ({ isDeparture }) => {
  const [currentMin, setCurrentMin] = useState(0)
  const [currentMax, setCurrentMax] = useState(1440)

  const onChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setCurrentMin(value[0])
      setCurrentMax(value[1])
    }
  }

  const isCloseToInitialMin = (value: number) => {
    return value >= 320
  }

  const isCloseToInitialMax = (value: number) => {
    return value <= 1440 - 1440 * 0.15
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
        min={0}
        max={1440}
        range={true}
        value={[currentMin, currentMax]}
        onChange={onChange}
      />
      <div className={styles.values}>
        <p
          className={styles.minValue}
          style={{ display: isCloseToInitialMin(currentMin) ? 'block' : 'none' }}
        >
          {formatTime(0)}
        </p>
        <div
          className={styles.currentMinValue}
          style={{
            left: `${(currentMin / 1440) * 100}%`,
          }}
        >
          {formatTime(currentMin)}
        </div>
        <div
          className={styles.currentMaxValue}
          style={{
            left: `${(currentMax / 1440) * 100}%`,
          }}
        >
          {formatTime(currentMax)}
        </div>
        <p
          className={styles.maxValue}
          style={{ display: isCloseToInitialMax(currentMax) ? 'block' : 'none' }}
        >
          {formatTime(1440)}
        </p>
      </div>
    </div>
  )
}

export default DestinationSlider
