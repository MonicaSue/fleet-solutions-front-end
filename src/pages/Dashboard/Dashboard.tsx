// npm
import { useState, useEffect } from 'react';

// services
import * as dashboardService from '../../services/dashboardService'

// components
import StatusIcon from '../../components/StatusIcon/StatusIcon';
import Takeovers from '../../components/DashboardCalcs/Takeovers';
import MilesDriven from '../../components/DashboardCalcs/MilesDriven';

// assets
import avIcon from '../../assets/icons/avIcon.png'

// css
import styles from './Dashboard.module.css'

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

  return (
    <main className={styles.container}>
      <div className={styles.top}>
        <div className={styles.statBox}>
          <div className={styles.statContainer}>
            <div className={styles.statIcon}>
              <img src={avIcon} alt="Av Icon" />
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
              <img src={avIcon} alt="Av Icon" />
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
              <img src={avIcon} alt="Av Icon" />
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
                <th>DATE</th>
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
                    <td><p>{maintenance.date}</p></td>
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