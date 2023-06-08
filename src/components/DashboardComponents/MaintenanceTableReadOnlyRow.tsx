// npm
import moment from "moment";

// component
import StatusIcon from "../StatusIcon/StatusIcon";
import MaintenanceTableEditableRow from "./MaintenanceTableEditableRow";

// css
import styles from "./DashboardComponent.module.css";

// types
import { Maintenance } from "../../types/models";
import { Av } from "../../types/models";

// assets
import edit from "../../assets/icons/edit.png";

interface MaintenanceTableReadOnlyRowProps {
  maintenance: Maintenance;
  av: Av;
  handleEditClick: (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  editInProgress: boolean;
  avId: number | null;
  editMaintenanceId: number | null;
}

const MaintenanceTableReadOnlyRow = (
  props: MaintenanceTableReadOnlyRowProps
) => {
  const { editInProgress, maintenance, av, handleEditClick, avId, editMaintenanceId } = props;

  if (editInProgress) return (
    <MaintenanceTableEditableRow 
      av={av}
      maintenance={maintenance}
      avId={avId}
      editMaintenanceId={editMaintenanceId}
    />
  )

  return (
    <>
      <tr>
        <td>
          <p>{av.vehicleNo}</p>
        </td>
        <td>
          <p>{maintenance.type}</p>
        </td>
        <td>
          <p>${maintenance.partsCost}</p>
        </td>
        <td>
          <p>${maintenance.laborCost}</p>
        </td>
        <td>
          <div className={styles.status}>
            <StatusIcon maintenance={maintenance} />
            <p>{maintenance.maintenanceStatus}</p>
          </div>
        </td>
        <td>
          <p>{moment.utc(maintenance.createdAt).format("D MMM YYYY")}</p>
        </td>
        <td>
          <p>{moment.utc(maintenance.date).format("D MMM YYYY")}</p>
        </td>
        <td>
          <p>{maintenance.notes}</p>
        </td>
        <td>
          <button
            id={maintenance.id.toString()}
            className={av.id.toString()}
            type="button"
            onClick={(evt) => handleEditClick(evt)}
          >
            <img src={edit} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default MaintenanceTableReadOnlyRow;
