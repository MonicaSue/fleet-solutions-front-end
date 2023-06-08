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
import { Av, Performance } from '../../types/models'

interface PerformanceChartProps {
  avs: Av[];  
}

const PerformanceChart = (props: PerformanceChartProps): JSX.Element => {
  const { avs } = props
  console.log(avs)

  const performanceArr = []
  avs.map((av) => (
    av.performances.map((performance) => (
      performanceArr.push(performance)
    ))
  ))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={avs}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="name" fill="#8884d8" />
        <Bar dataKey="priceUsd" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default PerformanceChart