// components
import ServiceBacklog from "../../components/DashboardCalcs/ServiceBacklog";

// css
import styles from "./DashboardComponent.module.css";

// assets
import serviceIcon from "../../assets/icons/service.png";
import costIcon from "../../assets/icons/dollar.png";
import partsIcon from "../../assets/icons/parts.png";

// types
import { Av } from "../../types/models";

interface MaintenanceKpiProps {
  avs: Av[];
}

const MaintenanceKpi = (props: MaintenanceKpiProps): JSX.Element => {
  const { avs } = props;

  const totalServiceCost = { parts: 0, labor: 0 };

  avs?.map((av) =>
    av.maintenance?.map((maintenance) =>
      maintenance.partsCost
        ? (totalServiceCost.parts += maintenance.partsCost)
        : (totalServiceCost.parts += 0)
    )
  );

  avs?.map((av) =>
    av.maintenances?.map((maintenance) =>
      maintenance.laborCost
        ? (totalServiceCost.labor += maintenance.laborCost)
        : (totalServiceCost.labor += 0)
    )
  );

  return (
    <>
      <div className={styles.statBox}>
        <div className={styles.statContainer}>
          <div className={styles.statIcon}>
            <img src={serviceIcon} alt="Maintenance Icon" />
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Service Backlog</div>
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
            <div className={styles.statLabel}>Total Parts Cost</div>
            <div className={styles.statNumber}>
              ${totalServiceCost.parts.toLocaleString()}
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
            <div className={styles.statLabel}>Total Labor Cost</div>
            <div className={styles.statNumber}>
              ${totalServiceCost.labor.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaintenanceKpi;
