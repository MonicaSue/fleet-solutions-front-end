// types
import { Av } from '../../types/models'

interface ServiceBacklogProps {
  avs: Av[]
}

const ServiceBacklog = (props: ServiceBacklogProps) => {
  const { avs } = props
  
  const queueCount = {total: 0}

  avs.map((av) => (
    av.maintenances.map((maintenance) => (
      maintenance.maintenanceStatus === 'In Queue' ? queueCount.total += 1 : queueCount.total += 0
    ))
  ))

  return (
    <>
      {queueCount.total}
    </>
  )
}

export default ServiceBacklog