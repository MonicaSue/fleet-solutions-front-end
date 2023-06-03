
// types
import { Av } from '../../types/models'

// assets
import avIcon from '../../assets/icons/av.svg'

interface AvCardProps {
  avs: Av[]
}

const AvCard = (props: AvCardProps): JSX.Element => {
  const { avs } = props

  return (
    <>
      {avs.map((av) => (
        <img 
          key={av.id}  
          src={avIcon} 
          alt="Vehicle Icon" 
        />
      ))}
    </>
  )
}

export default AvCard