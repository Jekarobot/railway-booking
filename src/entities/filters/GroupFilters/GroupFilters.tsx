import React from 'react'
import styles from './GroupFilters.module.css'
import { FilterItem } from './FilterItem/FilterItem'
import Coupe from '../../../shared/assets/svg/Coupe.svg'
import Platskart from '../../../shared/assets/svg/Platskart.svg'
import Sitting from '../../../shared/assets/svg/Sitting.svg'
import Lux from '../../../shared/assets/svg/Lux.svg'
import WiFi from '../../../shared/assets/svg/WiFi.svg'
import Express from '../../../shared/assets/svg/Express.svg'
import { useSearchContext } from '../../../providers/SearchProvider/SearchContext'
import { Routes } from '../../../shared/types/Routes'

interface FilterData {
  id: keyof Routes
  name: string
  icon: string
}

const filters: FilterData[] = [
  { id: 'have_second_class', name: 'Купе', icon: Coupe },
  { id: 'have_third_class', name: 'Плацкарт', icon: Platskart },
  { id: 'have_fourth_class', name: 'Сидячий', icon: Sitting },
  { id: 'have_first_class', name: 'Люкс', icon: Lux },
  { id: 'have_wifi', name: 'Wi-Fi', icon: WiFi },
  { id: 'have_express', name: 'Экспресс', icon: Express },
]

export const GroupFilters: React.FC = () => {
  const { searchParams, updateSearchParams } = useSearchContext()

  const handleToggle = (id: keyof Routes) => {
    // console.log(`Toggling filter: ${id}, current value: ${searchParams[id]}`)
    updateSearchParams({ [id]: !searchParams[id] })
  }

  return (
    <div className={styles.groupFilters}>
      {filters.map((filter) => (
        <FilterItem
          key={filter.id}
          id={filter.id}
          name={filter.name}
          icon={filter.icon}
          isChecked={!!searchParams[filter.id]}
          onChange={() => handleToggle(filter.id)}
        />
      ))}
    </div>
  )
}

export default GroupFilters
