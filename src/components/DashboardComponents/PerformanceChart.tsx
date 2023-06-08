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

import moment from "moment";

// types
import { Av, Performance, Takeover } from "../../types/models";

import styles from "./DashboardComponent.module.css";

interface PerformanceChartProps {
  avs: Av[];
}

const PerformanceChart = (props: PerformanceChartProps): JSX.Element => {
  const { avs } = props;
  
  const performanceArr: Performance[]= [];
  avs.forEach((av) => {
    av.performances.forEach((performance) => {
      performance.date = moment.utc(performance.date).format("yyyy-MM")
      performanceArr.push(performance)
    })
  })

  const takeoverData: Takeover[] = performanceArr.reduce(function (acc: Takeover[], curr) {
    const idx = acc.findIndex(obj => obj.date === curr.date)
    if (idx >= 0) {
      acc[idx].takeover += curr.takeover
    } else {
      acc.push({date: curr.date, takeover: curr.takeover})
    }
    return acc;
  }, []);

  takeoverData.sort(function(a, b) {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf()
  })


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
