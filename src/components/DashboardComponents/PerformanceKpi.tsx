// components
import Takeovers from "../../components/DashboardCalcs/Takeovers";
import MilesDriven from "../../components/DashboardCalcs/MilesDriven";

// assets
import avIcon from "../../assets/icons/avIcon.png";
import distanceIcon from "../../assets/icons/distance.png";
import takeoverIcon from "../../assets/icons/takeover.png";

// css
import styles from "./DashboardComponent.module.css";

// types
import { Av } from "../../types/models";

interface PerformanceKpiProps {
  avs: Av[];
}

const PerformanceKpi = (props: PerformanceKpiProps): JSX.Element => {
  const { avs } = props;

  return (
    <>
      <div className={styles.statBox}>
        <div className={styles.statContainer}>
          <div className={styles.statIcon}>
            <img src={avIcon} alt="Vehicle Icon" />
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Fleet Size</div>
            <div className={styles.statNumber}>{avs.length}</div>
          </div>
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statContainer}>
          <div className={styles.statIcon}>
            <img src={distanceIcon} alt="Distance Icon" />
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Total Miles Driven</div>
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
            <div className={styles.statLabel}>Total Takeovers</div>
            <div className={styles.statNumber}>
              <Takeovers avs={avs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerformanceKpi;
