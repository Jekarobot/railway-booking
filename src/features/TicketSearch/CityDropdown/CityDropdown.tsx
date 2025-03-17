import React from 'react'
import styles from './CityDropdown.module.css'
import { City } from '../../../shared/types/City'

interface CityDropdownProps {
  cities: City[]
  onSelect: (city: City) => void
  visible: boolean
}

const CityDropdown: React.FC<CityDropdownProps> = ({ cities, onSelect, visible }) => {
  if (!visible || cities.length === 0) return null

  return (
    <div className={styles.dropdown}>
      {cities.map((city) => (
        <div
          key={city.name}
          className={styles.dropdownItem}
          onClick={() => {
            onSelect(city)
          }}
        >
          {city.name}
        </div>
      ))}
    </div>
  )
}

export default CityDropdown
