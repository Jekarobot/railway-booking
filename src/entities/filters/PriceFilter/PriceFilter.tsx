import React, { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import classNames from 'classnames'
import styles from './PriceFilter.module.css'

interface PriceFilterProps {
  initialMin: number
  initialMax: number
}

const PriceFilter: React.FC<PriceFilterProps> = ({ initialMin, initialMax }) => {
  const [currentMin, setCurrentMin] = useState(initialMin)
  const [currentMax, setCurrentMax] = useState(initialMax)

  const onChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setCurrentMin(value[0])
      setCurrentMax(value[1])
    }
  }

  const isCloseToInitialMin = (value: number) => {
    return value >= 1 + initialMax * 0.1
  }

  const isCloseToInitialMax = (value: number) => {
    return value <= initialMax - initialMax * 0.15
  }

  return (
    <div className={classNames(styles.PriceFilter, 'price-filter')}>
      <h1 className={styles.title}>Стоимость</h1>
      <div className={styles.slider}>
        <div className={styles.text}>
          <p>от</p>
          <p>до</p>
        </div>
        <Slider
          min={initialMin}
          max={initialMax}
          range={true}
          value={[currentMin, currentMax]}
          onChange={onChange}
          step={100}
        />

        <div className={styles.values}>
          <p
            className={styles.minValue}
            style={{ display: isCloseToInitialMin(currentMin) ? 'block' : 'none' }}
          >
            {initialMin}
          </p>
          <div
            className={styles.currentMinValue}
            style={{
              left: `${((currentMin - initialMin) / (initialMax - initialMin)) * 100}%`,
            }}
          >
            {currentMin}
          </div>
          <div
            className={styles.currentMaxValue}
            style={{
              left: `${((currentMax - initialMin) / (initialMax - initialMin)) * 100}%`,
            }}
          >
            {currentMax}
          </div>
          <p
            className={styles.maxValue}
            style={{ display: isCloseToInitialMax(currentMax) ? 'block' : 'none' }}
          >
            {initialMax}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PriceFilter
