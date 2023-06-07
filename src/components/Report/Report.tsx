// npm
import { useEffect, useState } from "react";

// component
import NewMaintenance from "../NewMaintenance/NewMaintenance";
import NewPerformance from "../NewPerformance/NewPerformance";

// service
import * as avService from "../../services/avService";

// types
import { User } from "../../types/models";
import { UpdateAvFormData } from "../../types/forms";

// css
import styles from "./Report.module.css";

// mui
import { Button } from "@mui/material";

interface ReportProps {
  selectedAvId: string;
  user: User;
  handleDeleteAv: (avId: number) => Promise<void>;
}

const Report = (props: ReportProps): JSX.Element => {
  const { selectedAvId, user, handleDeleteAv } = props;

  const avId = parseInt(selectedAvId);

  const [formData, setFormData] = useState<UpdateAvFormData>({
    vehicleNo: "",
    status: "",
  });

  useEffect((): void => {
    const fetchDetails = async (): Promise<void> => {
      try {
        if (avId) {
          const avData = await avService.show(avId);
          setFormData(avData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [avId]);

  const handleChange = (
    evt: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async () => {
    // evt.preventDefault()
    console.log(formData);
    await avService.update(formData, avId);
  };

  return (
    <>
      {avId ? (
        <div className={styles.container}>
          <h1>{formData.vehicleNo}</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <fieldset>
              <legend>Vehicle Id</legend>
              <input
                type="text"
                name="vehicleNo"
                value={formData.vehicleNo}
                autoComplete="off"
                required
                onChange={(evt) => handleChange(evt)}
                className={styles.input}
              />
            </fieldset>
            <fieldset>
              <legend>Status</legend>
              <select
                name="status"
                value={formData.status}
                className={styles.select}
                onChange={(evt) => handleChange(evt)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Retired">Retired</option>
              </select>
            </fieldset>
            <div className={styles.buttons}>
              <Button onClick={handleSubmit} type="submit" variant="contained">
                Save
              </Button>
              <Button onClick={() => handleDeleteAv(avId)} variant="outlined">
                Delete
              </Button>
            </div>
          </form>
          <h1>AV Log</h1>
        </div>
      ) : (
        <h1>Select an AV</h1>
      )}
      {(avId && user.role === "Driver") || (avId && user.role === "Admin") ? (
        <div>
          <h2>Performance</h2>
          <NewPerformance avId={avId}/>
        </div>
      ) : (
        <></>
      )}
      {avId ? (
        <div>
          <h2>Maintenance</h2>
          <NewMaintenance avId={avId}/>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Report;
