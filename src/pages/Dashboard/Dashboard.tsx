// npm
import { useState, useEffect } from "react";

// services
import * as dashboardService from "../../services/dashboardService";

// components
import PerformanceKpi from "../../components/DashboardComponents/PerformanceKpi";
import MaintenanceKpi from "../../components/DashboardComponents/MaintenanceKpi";
import MaintenanceTable from "../../components/DashboardComponents/MaintenanceTable";
import MaintenanceChart from "../../components/DashboardComponents/MaintenanceChart";
import PerformanceChart from "../../components/DashboardComponents/PerformanceChart";

// css
import styles from "./Dashboard.module.css";

// mui
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

// types
import { Av } from "../../types/models";
import { User } from "../../types/models";

interface DashboardProps {
  user: User;
}

const Dashboard = (props: DashboardProps): JSX.Element => {
  const { user } = props;

  const [avs, setAvs] = useState<Av[]>([]);

  useEffect((): void => {
    const fetchAvs = async (): Promise<void> => {
      try {
        const avData: Av[] = await dashboardService.getAllAvs();
        setAvs(avData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAvs();
  }, []);

  const refreshPage = (): void => {
    window.location.reload();
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>{user ? user.role : ""} Dashboard</h1>
        <Button className={styles.button} onClick={refreshPage}>
          <RefreshIcon />
        </Button>
      </div>
      <div className={styles.top}>
        {user.role === "Mechanic" ? <></> : <PerformanceKpi avs={avs} />}
        {user.role === "Driver" ? <></> : <MaintenanceKpi avs={avs} />}
      </div>
      <div className={styles.mid}>
        <MaintenanceChart avs={avs} />
        <PerformanceChart avs={avs} />
      </div>
      <div className={styles.bottom}>
        <MaintenanceTable user={user} avs={avs} />
      </div>
    </main>
  );
};

export default Dashboard;
