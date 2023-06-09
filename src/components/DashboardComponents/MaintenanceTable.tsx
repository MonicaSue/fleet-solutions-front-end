// npm
import { useState } from "react";

// components
import MaintenanceTableReadOnlyRow from "./MaintenanceTableReadOnlyRow";
import StatusIcon from "../StatusIcon/StatusIcon";

// css
import styles from "./DashboardComponent.module.css";

// types
import { Av, User } from "../../types/models";

interface MaintenanceTableProps {
  avs: Av[];
  user: User | null;
  setAvs: (arr: Av[]) => void
}

const MaintenanceTable = (props: MaintenanceTableProps) => {
  const { avs, user } = props;

  const [editMaintenanceId, setEditMaintenanceId] = useState<number | null>(
    null
  );

  const [avId, setAvId] = useState<number | null>(null);

  const handleEditClick = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    evt.preventDefault();
    setEditMaintenanceId(parseInt(evt.currentTarget.id));
    setAvId(parseInt(evt.currentTarget.className));
  };

  return (
    <div className={styles.tableContainer}>
      <h2>Maintenance Report</h2>
      {(user && user.role === "Mechanic") || (user && user.role === "Admin") ? (
        <form>
          <table>
            <thead>
              <tr>
                <th>VEHICLE ID</th>
                <th>TYPE</th>
                <th>PARTS COST</th>
                <th>LABOR COST</th>
                <th>STATUS</th>
                <th>CREATION DATE</th>
                <th>COMPLETED DATE</th>
                <th>NOTES</th>
                <th>EDIT</th>
              </tr>
            </thead>
            {avs.map((av) => (
              <tbody key={av.id}>
                {av.maintenances.map((maintenance) => (
                  <MaintenanceTableReadOnlyRow
                    key={maintenance.id}
                    maintenance={maintenance}
                    avs={avs}
                    av={av}
                    avId={avId}
                    editMaintenanceId={editMaintenanceId}
                    setEditMaintenanceId={setEditMaintenanceId}
                    handleEditClick={handleEditClick}
                    editInProgress={editMaintenanceId === maintenance.id}
                    setAvs={props.setAvs}
                  />
                ))}
              </tbody>
            ))}
          </table>
        </form>
      ) : (
        <table>
          <thead>
            <tr>
              <th>VEHICLE ID</th>
              <th>TYPE</th>
              <th>TOTAL COST</th>
              <th>STATUS</th>
            </tr>
          </thead>
          {avs.map((av) => (
            <tbody key={av.id}>
              {av.maintenances.map((maintenance) => (
                <tr key={maintenance.id}>
                  <td>
                    <p>{av.vehicleNo}</p>
                  </td>
                  <td>
                    <p>{maintenance.type}</p>
                  </td>
                  <td>
                    <p>${maintenance.partsCost + maintenance.laborCost}</p>
                  </td>
                  <td>
                    <div className={styles.status}>
                      <StatusIcon maintenance={maintenance} />
                      <p>{maintenance.maintenanceStatus}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      )}
    </div>
  );
};

export default MaintenanceTable;
