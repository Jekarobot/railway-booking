import styles from './FilterAside.module.css'
import DateFilter from './DateFilter/DateFilter'
import GroupFilters from './GroupFilters/GroupFilters'
import PriceFilter from './PriceFilter/PriceFilter'
import DestinationFilter from './DestinationFilter/DestinationFilter'

const FilterAside = () => {
  return (
    <div className={styles.filterAside}>
      <DateFilter />
      <GroupFilters />
      <PriceFilter initialMin={0} initialMax={10000} />
      <DestinationFilter />
      <div className={styles.filterAside__groupComeback}></div>
    </div>
  )
}

export default FilterAside
