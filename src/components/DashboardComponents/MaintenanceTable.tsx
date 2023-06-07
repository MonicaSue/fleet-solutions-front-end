// npm
import { useState } from 'react'

// components
// import StatusIcon from '../StatusIcon/StatusIcon'
import MaintenanceTableReadOnlyRow from './MaintenanceTableReadOnlyRow'
import MaintenanceTableEditableRow from './MaintenanceTableEditableRow'

// service
import * as avService from '../../services/avService'

// css
import styles from './DashboardComponent.module.css'

// types
import { Av } from '../../types/models'
// import { UpdateMaintenanceFormData } from "../../types/forms";

interface MaintenanceTableProps {
  avs: Av[]
}

const MaintenanceTable = (props: MaintenanceTableProps) => {
  const { avs } = props



  const [editMaintenanceId, setEditMaintenanceId] = useState<number | null>(null)

  const [avId, setAvId] = useState<number | null>(null)

  const handleEditClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    evt.preventDefault()
    console.log(evt)
    setEditMaintenanceId(parseInt(evt.currentTarget.id))
    setAvId(parseInt(evt.currentTarget.className))
  }

  return (
    <>
      <div className={styles.tableContainer}>
        <h2>Maintenance Report</h2>
        <form>
          <table>
            <thead>
              <tr>
                <th>VEHICLE ID</th>
                <th>TYPE</th>
                <th>PARTS COST</th>
                <th>LABOR COST</th>
                <th>STATUS</th>
                <th>CREATION DATE</th>
                <th>COMPLETED DATE</th>
                <th>NOTES</th>
                <th>EDIT</th>
              </tr>
            </thead>
            {avs.map((av) => (
              <tbody key={av.id}>
                {av.maintenances.map((maintenance) => (
                  <>
                    { editMaintenanceId === maintenance.id ?
                      <MaintenanceTableEditableRow key={maintenance.id} av={av} maintenance={maintenance} avId={avId} editMaintenanceId={editMaintenanceId}/>
                    :
                      <MaintenanceTableReadOnlyRow key={maintenance.id} maintenance={maintenance} av={av} handleEditClick={handleEditClick}/>
                    }
                  </>
                ))}
              </tbody>
            ))}
          </table>
        </form>
      </div>
    </>
  )
}

export default MaintenanceTable