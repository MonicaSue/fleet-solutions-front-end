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

import moment from "moment";

// types
import { Av, Maintenance, Service } from '../../types/models'

// css
import styles from  './DashboardComponent.module.css'

interface MaintenanceChartProps {
  avs: Av[];  
}

const MaintenanceChart = (props: MaintenanceChartProps): JSX.Element => {
  const { avs } = props

  const maintenanceArr: Maintenance[] = []
  avs.forEach((av) => {
    av.maintenances.forEach((maintenance) => {
      // maintenance.date = moment.utc(maintenance.date).format("yyyy-MM")
      maintenanceArr.push(maintenance)
    })
  })

  const serviceData: Service[] = maintenanceArr.reduce(function (acc: Service[], curr) {
    const idx = acc.findIndex(obj => obj.type === curr.type)
    if (idx >= 0) {
      acc[idx].partsCost += curr.partsCost
      acc[idx].laborCost += curr.laborCost

    } else {
      acc.push({type: curr.type, partsCost: curr.partsCost, laborCost: curr.laborCost})
    }
    return acc;
  }, []);

  console.log ('SERVICE', serviceData)

  return (
    <div className={styles.maintenanceChartContainer}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={serviceData}
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
          <Bar dataKey="partsCost" stackId="a" fill="#161617d9" />
          <Bar dataKey="laborCost" stackId="a" fill="#2196f3" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MaintenanceChart