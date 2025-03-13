import React, { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import classNames from 'classnames'
import styles from './DestinationFilter.module.css'

interface DestinationFilterProps {
  id: string
  name: string
  icon: string
  initialMin: number
  initialMax: number
  isLeave: boolean
}

const DestinationFilter: React.FC<DestinationFilterProps> = ({
  id,
  name,
  icon,
  initialMin,
  initialMax,
  isLeave,
}) => {
  const [currentMin, setCurrentMin] = useState(initialMin)
  const [currentMax, setCurrentMax] = useState(initialMax)

  const onChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setCurrentMin(value[0])
      setCurrentMax(value[1])
    }
  }

  return (
    <div className={isLeave ? styles.DestinationFilterLeave : styles.DestinationFilterArrive}></div>
  )
}

export default DestinationFilter
