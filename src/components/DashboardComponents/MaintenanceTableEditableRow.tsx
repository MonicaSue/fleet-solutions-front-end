// npm
import { useState } from "react";
import moment from "moment";

// service
import * as avService from "../../services/avService";

// css
import styles from "./DashboardComponent.module.css";

// assets
import save from "../../assets/icons/save.png";

// types
import { Av, Maintenance } from "../../types/models";
import { UpdateMaintenanceFormData } from "../../types/forms";

interface MaintenanceTableEditableRowProps {
  maintenance: Maintenance;
  av: Av;
  avId: number | null;
  editMaintenanceId: number | null;
  setEditMaintenanceId: (val: number | null) => void;
  setAvs: (arr: Av[]) => void;
  avs: Av[]
}

const MaintenanceTableEditableRow = (
  props: MaintenanceTableEditableRowProps
) => {
  const {
    maintenance,
    av,
    avId,
    editMaintenanceId,
    setEditMaintenanceId,
    setAvs,
    avs,
  } = props;

  const [formData, setFormData] =
    useState<UpdateMaintenanceFormData>(maintenance);

  const handleChange = (
    evt: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    evt.preventDefault();
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    if (avId && editMaintenanceId) {
      const updatedAv = await avService.updateMaintenance(
        formData,
        avId,
        editMaintenanceId
      );
      const newAvs = avs.map((prevAv) => {
        return prevAv.id === avId ? updatedAv : prevAv;
      });
      setAvs(newAvs)
    }
    setEditMaintenanceId(null);
  };

  return (
    <>
      <tr>
        <td>{av.vehicleNo}</td>
        <td>
          <input
            type="text"
            name="type"
            value={formData.type}
            autoComplete="off"
            required
            className={styles.input}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            type="number"
            name="partsCost"
            value={formData.partsCost}
            autoComplete="off"
            required
            className={styles.input}
            onChange={handleChange}
          />
        </td>
        <td>
          <input
            type="number"
            name="laborCost"
            value={formData.laborCost}
            autoComplete="off"
            required
            className={styles.input}
            onChange={handleChange}
          />
        </td>
        <td>
          <select
            name="maintenanceStatus"
            value={formData.maintenanceStatus}
            required
            className={styles.select}
            onChange={handleChange}
          >
            <option value={"Completed"}>Completed</option>
            <option value={"In Progress"}>In Progress</option>
            <option value={"In Queue"}>In Queue</option>
          </select>
        </td>
        <td>{moment.utc(maintenance.createdAt).format("D MMM YYYY")}</td>
        <td>
          <input
            type="date"
            name="date"
            value={formData.date}
            required
            className={styles.input}
            onChange={handleChange}
          />
        </td>
        <td>
          <textarea
            name="notes"
            value={formData.notes}
            autoComplete="off"
            required
            className={styles.textarea}
            onChange={handleChange}
          />
        </td>
        <td>
          <button onClick={handleSubmit} type="submit">
            <img src={save} alt="save icon" />
          </button>
        </td>
      </tr>
    </>
  );
};

export default MaintenanceTableEditableRow;
