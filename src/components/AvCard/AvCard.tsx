// types
import { Av } from '../../types/models'

// assets
import avIcon from '../../assets/icons/av.svg'

// css
import styles from './AvCard.module.css'

interface AvCardProps {
  av: Av
}

const AvCard = (props: AvCardProps): JSX.Element => {
  const { av } = props


  return (
    <div className={styles.container}>
        <img
          key={av.id}  
          className={av.status === 'Under Maintenance' ? `${styles.underMaintenance}` : ''}
          id={av.id.toString()}
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