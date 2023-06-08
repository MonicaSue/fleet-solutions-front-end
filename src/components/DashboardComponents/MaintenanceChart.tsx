import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

// types
import { Av, Maintenance } from '../../types/models'

// css
import styles from  './DashboardComponent.module.css'

interface MaintenanceChartProps {
  avs: Av[];  
}

const MaintenanceChart = (props: MaintenanceChartProps): JSX.Element => {
  const { avs } = props

  const maintenanceData = []
  avs.map((av) => (
    av.maintenances.map((maintenance) => (
      maintenanceData.push(maintenance)
    ))
  ))

  console.log(maintenanceData)

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={maintenanceData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="name" fill="#8884d8" />
          <Bar dataKey="partsCost" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MaintenanceChart