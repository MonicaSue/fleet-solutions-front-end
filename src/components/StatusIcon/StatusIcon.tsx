// assets
import Completed from '../../assets/icons/check.png'
import InProgress from '../../assets/icons/inProgress.png'
import InQueue from '../../assets/icons/InQueue.png'

// types
import { Maintenance } from '../../types/models'

const iconTable = {
  Completed,
  InProgress,
  InQueue,
}

interface StatusIconProps {
  maintenance: Maintenance
}

const StatusIcon = (props: StatusIconProps) => {
  const { maintenance } = props
  
  const status = maintenance.maintenanceStatus.replaceAll(" ", "")
  const statusIcon: string = iconTable[status]
  
  return (
    <img src={statusIcon} alt="Status Icon" />
  )
}

export default StatusIcon;