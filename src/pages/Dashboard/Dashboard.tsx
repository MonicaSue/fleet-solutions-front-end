// npm
import { useState, useEffect } from 'react';
import moment from 'moment';

// services
import * as dashboardService from '../../services/dashboardService'

// components
import StatusIcon from '../../components/StatusIcon/StatusIcon';
import Takeovers from '../../components/DashboardCalcs/Takeovers';
import MilesDriven from '../../components/DashboardCalcs/MilesDriven';
import ServiceBacklog from '../../components/DashboardCalcs/ServiceBacklog';

// assets
import avIcon from '../../assets/icons/avIcon.png'
import distanceIcon from '../../assets/icons/distance.png'
import takeoverIcon from '../../assets/icons/takeover.png'
import serviceIcon from '../../assets/icons/service.png'
import costIcon from '../../assets/icons/dollar.png'
import partsIcon from '../../assets/icons/parts.png'

// css
import styles from './Dashboard.module.css'

// mui
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

// types
import { Av } from '../../types/models'
import { User } from '../../types/models'

interface DashboardProps {
  user: User | null;
}

const Dashboard = (props: DashboardProps) => {
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

  const totalServiceCost = {parts: 0, labor: 0}

  avs.map((av) => (
    av.maintenances.map((maintenance) => (
      maintenance.partsCost ? totalServiceCost.parts += maintenance.partsCost : totalServiceCost.parts += 0
    ))
  ))

  avs.map((av) => (
    av.maintenances.map((maintenance) => (
      maintenance.laborCost ? totalServiceCost.labor += maintenance.laborCost : totalServiceCost.labor += 0
    ))
  ))

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>{user ? user.role : ''} Dashboard</h1>
        <Button className={styles.button} onClick={refreshPage}>
          <RefreshIcon />
        </Button>
      </div>
      <div className={styles.top}>
        <div className={styles.statBox}>
          <div className={styles.statContainer}>
            <div className={styles.statIcon}>
              <img src={avIcon} alt="Vehicle Icon" />
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>
                Fleet Size
              </div>
              <div className={styles.statNumber}>
                {avs.length}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statContainer}>
            <div className={styles.statIcon}>
              <img src={distanceIcon} alt="Distance Icon" />
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>
                Total Miles Driven
              </div>
              <div className={styles.statNumber}>
              <MilesDriven avs={avs} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statContainer}>
            <div className={styles.statIcon}>
              <img src={takeoverIcon} alt="Steering Wheel Icon" />
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>
                Total Takeovers
              </div>
              <div className={styles.statNumber}>
                <Takeovers avs={avs} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statContainer}>
            <div className={styles.statIcon}>
              <img src={serviceIcon} alt="Maintenance Icon" />
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>
                Service Backlog
              </div>
              <div className={styles.statNumber}>
                <ServiceBacklog avs={avs} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statContainer}>
            <div className={styles.statIcon}>
              <img src={partsIcon} alt="Parts Icon" />
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>
                Total Parts Cost
              </div>
              <div className={styles.statNumber}>
              ${(totalServiceCost.parts).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statContainer}>
            <div className={styles.statIcon}>
              <img src={costIcon} alt="Dollar" />
            </div>
            <div className={styles.stat}>
              <div className={styles.statLabel}>
                Total Labor Cost
              </div>
              <div className={styles.statNumber}>
              ${(totalServiceCost.labor).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </main>
  )
}

export default Dashboard