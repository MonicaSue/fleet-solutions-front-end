// npm
import moment from 'moment'

// component
import StatusIcon from '../StatusIcon/StatusIcon'

// css
import styles from './DashboardComponent.module.css'

// types
import { Maintenance } from '../../types/models'
import { Av } from '../../types/models'


interface MaintenanceTableReadOnlyRowProps {
  maintenance: Maintenance
  av: Av
  handleEditClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const MaintenanceTableReadOnlyRow = (props: MaintenanceTableReadOnlyRowProps) => {
  const { maintenance, av, handleEditClick } = props
  
  
  return (
    <>
      <tr>
        <td><p>{av.vehicleNo}</p></td>
        <td><p>{maintenance.type}</p></td>
        <td><p>${maintenance.partsCost}</p></td>
        <td><p>${maintenance.laborCost}</p></td>
        <td>
          <div className={styles.status}>
            <StatusIcon maintenance={maintenance}/>
            <p>{maintenance.maintenanceStatus}</p>
          </div>
        </td>
        <td><p>{moment.utc(maintenance.createdAt).format('D MMM YYYY')}</p></td>
        <td><p>{moment.utc(maintenance.date).format('D MMM YYYY')}</p></td>
        <td><p>{maintenance.notes}</p></td>
        <td><button id={maintenance.id.toString()} type='button' onClick={(evt)=> handleEditClick(evt)}>Edit</button></td>
      </tr>
    </>
  )
}

export default MaintenanceTableReadOnlyRow