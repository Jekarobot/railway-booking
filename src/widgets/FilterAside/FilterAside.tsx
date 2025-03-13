import styles from './FilterAside.module.css'
import DateFilter from '../../entities/filters/DateFilter/DateFilter'
import GroupFilters from '../../entities/filters/GroupFilters/GroupFilters'
import PriceFilter from '../../entities/filters/PriceFilter/PriceFilter'
import DestinationFilter from '../../entities/filters/DestinationFilter/DestinationFilter'

const FilterAside = () => {
  return (
    <div className={styles.filterAside}>
      <DateFilter />
      <GroupFilters />
      <PriceFilter initialMin={0} initialMax={10000} />
      {/* <DestinationFilter /> */}
      <div className={styles.groupComeback}></div>
    </div>
  )
}

export default FilterAside
