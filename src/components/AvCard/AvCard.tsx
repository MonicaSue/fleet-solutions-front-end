
// types
import { Av } from '../../types/models'

// assets
import avIcon from '../../assets/icons/av.svg'

// css
import styles from './AvCard.module.css'

interface AvCardProps {
  av: Av
  selectedAv: Av[] | null
}

const AvCard = (props: AvCardProps): JSX.Element => {
  const { av } = props
  console.log(av)


  return (
    <div className={styles.container}>
      <img
        key={av.id}  
        className={styles.avIcon}
        src={avIcon} 
        alt="Vehicle Icon" 
      />
      <div className={styles.overlayText}>
        <h4 className={styles.vin}>{av.vehicleNo}</h4>
      </div>
    </div>
  )
}

export default AvCard