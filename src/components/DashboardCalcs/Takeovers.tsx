// types
import { Av } from '../../types/models'

interface TakeoversProps {
  avs: Av[]
}

const Takeovers = (props: TakeoversProps) => {
  const { avs } = props

  const takeovers = {total: 0}

  avs.map((av) => (
    av.performances.map((performance) => (
      performance.takeover ? takeovers.total += performance.takeover : takeovers.total += 0
    ))
  ))
  
  const avgTakeovers = !takeovers.total ? 0 : (takeovers.total / avs.length).toFixed(1)

  return (
    <>
      {takeovers.total}
    </>
  )
}

export default Takeovers