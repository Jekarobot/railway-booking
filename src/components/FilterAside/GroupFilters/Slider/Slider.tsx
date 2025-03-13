import React from 'react'
import styles from './Slider.module.css'

interface SliderProps {
  isChecked: boolean
  onChange: () => void
}

export const Slider: React.FC<SliderProps> = ({ isChecked, onChange }) => {
  return (
    <label className={styles.filterAside__switch}>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <span className={styles.filterAside__slider}></span>
    </label>
  )
}

export default Slider
