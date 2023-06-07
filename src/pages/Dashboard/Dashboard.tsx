// npm
import { useState, useEffect } from 'react';
import moment from 'moment';

// services
import * as dashboardService from '../../services/dashboardService'

// components
import StatusIcon from '../../components/StatusIcon/StatusIcon';
import PerformanceKpi from '../../components/DashboardComponents/PerformanceKpi';
import MaintenanceKpi from '../../components/DashboardComponents/MaintenanceKpi';
import MaintenanceTable from '../../components/DashboardComponents/MaintenanceTable';

// css
import styles from './Dashboard.module.css'

// mui
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

// types
import { Av } from '../../types/models'
import { User } from '../../types/models'

interface DashboardProps {
  user: User;
}

const Dashboard = (props: DashboardProps): JSX.Element => {
  const { user } = props

  const [avs, setAvs] = useState<Av[]>([])

  useEffect((): void => {
    const fetchAvs = async (): Promise<void> => {
      try {
        const avData: Av[] = await dashboardService.getAllAvs()
        setAvs(avData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAvs()
  }, [])

  const refreshPage = (): void => {
    window.location.reload()
  }


  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>{user ? user.role : ''} Dashboard</h1>
        <Button className={styles.button} onClick={refreshPage}>
          <RefreshIcon />
        </Button>
      </div>
      <div className={styles.top}>
        {user.role === 'Mechanic' ? <></> :
          <PerformanceKpi avs={avs}/>
        }
        <MaintenanceKpi avs={avs}/>
      </div>
      <div className={styles.mid}>
        <div className={styles.tableContainer}>
          <h2>Maintenance Report</h2>
          <table>
            <thead>
              <tr>
                <th>VEHICLE ID</th>
                <th>TYPE</th>
                <th>TOTAL COST</th>
                <th>STATUS</th>
                <th>CREATION DATE</th>
              </tr>
            </thead>
            {avs.map((av) => (
              <tbody key={av.id}>
                {av.maintenances.map((maintenance) => (
                  <tr key={maintenance.id}>
                    <td><p>{av.vehicleNo}</p></td>
                    <td><p>{maintenance.type}</p></td>
                    <td><p>${maintenance.partsCost + maintenance.laborCost}</p></td>
                    <td>
                      <div className={styles.status}>
                        <StatusIcon maintenance={maintenance}/>
                        <p>{maintenance.maintenanceStatus}</p>
                      </div>
                    </td>
                    <td><p>{moment.utc(maintenance.createdAt).format('D MMM YYYY')}</p></td>
                  </tr>
                ))}
              </tbody>
              ))}
          </table>
        </div>
        <MaintenanceTable avs={avs}/>
      </div>
    </main>
  )
}

export default Dashboard