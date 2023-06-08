import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

// types
import { Av, Performance } from "../../types/models";

import styles from './DashboardComponent.module.css'

interface PerformanceChartProps {
  avs: Av[];
}

const PerformanceChart = (props: PerformanceChartProps): JSX.Element => {
  const { avs } = props;

  let performanceArr = []
  avs.map((av) =>
    av.performances.map((performance) => 
      performanceArr.push(performance)
      )
  );
  console.log(performanceArr);

  const takeoverData = [];
  performanceArr.reduce(function (acc, value) {
    if (!acc[value.date]) {
      acc[value.date] = { date: value.date, takeover: 0 };
      takeoverData.push(acc[value.date]);
    }
    acc[value.date].takeover += value.takeover;
    return acc;
  }, {});
  console.log(takeoverData);


  return (
    <div className={styles.performanceChartContainer}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={takeoverData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="takeover" fill="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
