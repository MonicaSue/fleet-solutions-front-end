// npm
import { useState } from 'react'

// components
// import StatusIcon from '../StatusIcon/StatusIcon'
import MaintenanceTableReadOnlyRow from './MaintenanceTableReadOnlyRow'
import MaintenanceTableEditableRow from './MaintenanceTableEditableRow'

// css
import styles from './DashboardComponent.module.css'

// types
import { Av } from '../../types/models'
import { UpdateMaintenanceFormData } from "../../types/forms";

interface MaintenanceTableProps {
  avs: Av[]
}

const MaintenanceTable = (props: MaintenanceTableProps) => {
  const { avs } = props

  const [formData, setFormData] = useState<UpdateMaintenanceFormData>({
    type: "",
    partsCost: 0,
    laborCost: 0,
    maintenanceStatus: "",
    date: "",
    notes: "",
  });

  const [editMaintenanceId, setEditMaintenanceId] = useState<number | null>(null)

  const handleEditClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    evt.preventDefault()
    setEditMaintenanceId(parseInt(evt.currentTarget.id))
  }

  const handleChange = (
    evt: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    evt.preventDefault()
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async () => {
    // evt.preventDefault()
    console.log(formData);
    await avService.update(formData, avId);
  };

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
                      <MaintenanceTableEditableRow key={maintenance.id} handleChange={handleChange} handleSubmit={handleSubmit}/>
                    :
                      <MaintenanceTableReadOnlyRow key={maintenance.id} maintenance={maintenance} av={av} handleEditClick={handleEditClick}/>
                    }
                  </>
                  // <tr key={maintenance.id}>
                  //   <td><p>{av.vehicleNo}</p></td>
                  //   <td><p>{maintenance.type}</p></td>
                  //   <td><p>${maintenance.partsCost}</p></td>
                  //   <td><p>${maintenance.laborCost}</p></td>
                  //   <td>
                  //     <div className={styles.status}>
                  //       <StatusIcon maintenance={maintenance}/>
                  //       <p>{maintenance.maintenanceStatus}</p>
                  //     </div>
                  //   </td>
                  //   <td><p>{moment.utc(maintenance.createdAt).format('D MMM YYYY')}</p></td>
                  //   <td><p>{moment.utc(maintenance.date).format('D MMM YYYY')}</p></td>
                  //   <td><p>${maintenance.notes}</p></td>
                  //   <td><button>Edit</button></td>
                  // </tr>
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