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

  return (
    <div className={classNames(styles.PriceFilter, 'price-filter')}>
      <h1 className={styles.priceFilter__title}>Стоимость</h1>
      <div className={styles.priceFilter__slider}>
        <div className={styles.priceFilter__text}>
          <p>от</p>
          <p>до</p>
        </div>
        <Slider
          min={initialMin}
          max={initialMax}
          range={true}
          value={[currentMin, currentMax]}
          onChange={onChange}
          styles={{}}
          className={classNames('rc-slider', styles.customSlider)}
        />

        <div className={styles.priceFilter__values}>
          <p className={styles.priceFilter__minValue}>{initialMin}</p>
          <div
            className={styles.priceFilter__currentMinValue}
            style={{
              left: `${((currentMin - initialMin) / (initialMax - initialMin)) * 100}%`,
              display: currentMin === initialMin ? `none` : `block`,
            }}
          >
            {currentMin}
          </div>
          <div
            className={styles.priceFilter__currentMaxValue}
            style={{
              left: `${((currentMax - initialMin) / (initialMax - initialMin)) * 100}%`,
              display: currentMax === initialMax ? `none` : `block`,
            }}
          >
            {currentMax}
          </div>
          <p className={styles.priceFilter__maxValue}>{initialMax}</p>
        </div>
      </div>
    </div>
  )
}

export default PriceFilter
