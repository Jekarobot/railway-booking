import React, { useEffect, useState, useMemo, useRef } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import classNames from 'classnames'
import styles from './PriceFilter.module.css'
import { useSearchContext } from '../../../providers/SearchProvider/SearchContext'

const PriceFilter: React.FC = () => {
  const { routesResponse, updateSearchParams } = useSearchContext()

  // Вычисляем начальные min и max цены
  // const { minPrice, maxPrice } = useMemo(() => {
  //   if (!routesResponse?.items?.length) return { minPrice: 0, maxPrice: 10000 }

  //   let minPrice = routesResponse.items[0].min_price
  //   let maxPrice = routesResponse.items[0].min_price

  //   routesResponse.items.forEach((item) => {
  //     if (item.min_price < minPrice) minPrice = item.min_price
  //     if (item.min_price > maxPrice) maxPrice = item.min_price
  //   })

  //   return { minPrice, maxPrice }
  // }, [routesResponse?.items])

  //К сожалению, эту логику я не смог заставить работать корректно, чтобы она не ломала поиск. Из-за того, что сервер возвращает ограниченное количество маршрутов, не хватает, чтобы он с кол-вом маршрутов возвращал диапазон цен вне массива.

  const minPrice = 0
  const maxPrice = 20000

  // Храним начальные значения min/max, чтобы не менять их при каждом ререндере
  const initialMinRef = useRef(minPrice)
  const initialMaxRef = useRef(maxPrice)

  // Локальные состояния для текущих значений ползунка
  const [currentMin, setCurrentMin] = useState(minPrice)
  const [currentMax, setCurrentMax] = useState(maxPrice)

  // Обновляем параметры поиска с задержкой
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateSearchParams({ price_from: currentMin, price_to: currentMax })
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [currentMin, currentMax, updateSearchParams])

  // Проверяем, близко ли значение к начальному минимуму или максимуму
  const isCloseToInitialMin = (value: number) => {
    return value > initialMinRef.current + (initialMaxRef.current - initialMinRef.current) * 0.1
  }

  const isCloseToInitialMax = (value: number) => {
    return value < initialMaxRef.current - (initialMaxRef.current - initialMinRef.current) * 0.1
  }

  // Обработчик изменения ползунка
  const onChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setCurrentMin(value[0])
      setCurrentMax(value[1])
    }
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
          min={initialMinRef.current} // Берем начальное значение
          max={initialMaxRef.current} // Берем начальное значение
          range={true}
          value={[currentMin, currentMax]}
          onChange={onChange}
          step={10}
        />
        <div className={styles.values}>
          <p
            className={styles.minValue}
            style={{ display: isCloseToInitialMin(currentMin) ? 'block' : 'none' }}
          >
            {initialMinRef.current}
          </p>
          <div
            className={styles.currentMinValue}
            style={{
              left: `${((currentMin - initialMinRef.current) / (initialMaxRef.current - initialMinRef.current)) * 100}%`,
            }}
          >
            {currentMin}
          </div>
          <div
            className={styles.currentMaxValue}
            style={{
              left: `${((currentMax - initialMinRef.current) / (initialMaxRef.current - initialMinRef.current)) * 100}%`,
            }}
          >
            {currentMax}
          </div>
          <p
            className={styles.maxValue}
            style={{ display: isCloseToInitialMax(currentMax) ? 'block' : 'none' }}
          >
            {initialMaxRef.current}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PriceFilter
