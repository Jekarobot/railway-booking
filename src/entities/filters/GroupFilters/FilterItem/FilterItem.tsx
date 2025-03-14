import Slider from '../../../../features/Slider/Slider'
import styles from './FilterItem.module.css'

interface FilterItemProps {
  id: string
  name: string
  icon: string
  isChecked: boolean
  onChange: () => void
}

export const FilterItem: React.FC<FilterItemProps> = ({ id, name, icon, isChecked, onChange }) => {
  return (
    <div id={id} className={styles.option}>
      <img src={icon} className={styles.img} alt={name} />
      <p className={styles.name}>{name}</p>
      <Slider isChecked={isChecked} onChange={onChange} />
    </div>
  )
}
