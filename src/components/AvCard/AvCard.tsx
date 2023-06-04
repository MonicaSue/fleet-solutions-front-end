// npm
import { Link } from 'react-router-dom'

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
      {/* <Link to={`/avs/${av.id}`}> */}
        <img
          key={av.id}  
          className={styles.avIcon}
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