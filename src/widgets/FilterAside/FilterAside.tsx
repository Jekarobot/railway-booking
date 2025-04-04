import styles from './FilterAside.module.css'
import DateFilter from '../../entities/filters/DateFilter/DateFilter'
import GroupFilters from '../../entities/filters/GroupFilters/GroupFilters'
import PriceFilter from '../../entities/filters/PriceFilter/PriceFilter'
import DestinationFilter from '../../entities/filters/DestinationFilter/DestinationFilter'
import ArrowRight from '../../shared/assets/svg/ArrowRight.svg'
import ArrowLeft from '../../shared/assets/svg/ArrowLeft.svg'

const FilterAside = () => {
  return (
    <div className={styles.filterAside}>
      <DateFilter />
      <GroupFilters />
      <PriceFilter />
      <DestinationFilter icon={ArrowRight} isBack={false} />
      <DestinationFilter icon={ArrowLeft} isBack />
    </div>
  )
}

export default FilterAside
