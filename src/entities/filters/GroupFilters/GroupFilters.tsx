import React, { useState } from 'react'
import styles from './GroupFilters.module.css'
import { FilterItem } from './FilterItem/FilterItem'
import Coupe from '../../../shared/assets/svg/Coupe.svg'
import Platskart from '../../../shared/assets/svg/Platskart.svg'
import Sitting from '../../../shared/assets/svg/Sitting.svg'
import Lux from '../../../shared/assets/svg/Lux.svg'
import WiFi from '../../../shared/assets/svg/WiFi.svg'
import Express from '../../../shared/assets/svg/Express.svg'

interface FilterData {
  id: string
  name: string
  icon: string
}

const filters: FilterData[] = [
  { id: 'coupe', name: 'Купе', icon: Coupe },
  { id: 'platskart', name: 'Плацкарт', icon: Platskart },
  { id: 'sitting', name: 'Сидячий', icon: Sitting },
  { id: 'lux', name: 'Люкс', icon: Lux },
  { id: 'wifi', name: 'Wi-Fi', icon: WiFi },
  { id: 'express', name: 'Экспресс', icon: Express },
]

export const GroupFilters: React.FC = () => {
  const [checkedFilters, setCheckedFilters] = useState<Set<string>>(new Set())

  const handleToggle = (id: string) => {
    setCheckedFilters((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className={styles.groupFilters}>
      {filters.map((filter) => (
        <FilterItem
          key={filter.id}
          id={filter.id}
          name={filter.name}
          icon={filter.icon}
          isChecked={checkedFilters.has(filter.id)}
          onChange={() => handleToggle(filter.id)}
        />
      ))}
    </div>
  )
}

export default GroupFilters
