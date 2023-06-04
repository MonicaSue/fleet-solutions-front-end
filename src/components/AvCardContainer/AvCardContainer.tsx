// components
import AvCard from '../AvCard/AvCard'

// styles
import styles from './AvCardContainer.module.css'

// types
import { Av } from '../../types/models'

interface AvCardContainerProps {
  avs: Av[]
  slectedAv: Av[] | null
}

const AvCardContainer = (props: AvCardContainerProps): JSX.Element => {
  const { avs, selectedAv } = props
  return (
    <div className={styles.container}>
      {avs.map((av) => (
        <AvCard key={av.id} av={av} selectedAv={selectedAv}/>
      ))}
    </div>
  )
}

export default AvCardContainer