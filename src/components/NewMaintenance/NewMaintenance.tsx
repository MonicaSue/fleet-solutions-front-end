// npm
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

// services
import * as avService from "../../services/avService";

// types
import { MaintenanceFormData } from "../../types/forms";

// mui
import { Button, Switch, FormGroup, FormControlLabel } from "@mui/material";

// css
import styles from "./NewMaintenance.module.css";

interface NewMaintenanceProps {
  avId: number;
}

const NewMaintenance = (props: NewMaintenanceProps): JSX.Element => {
  const { avId } = props;

  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false);

  const defaultDate = moment.utc(new Date()).format("yyyy-MM-DD");

  const [formData, setFormData] = useState<MaintenanceFormData>({
    type: "",
    maintenanceStatus: "In Queue",
    partsCost: 0,
    laborCost: 0,
    date: defaultDate,
    notes: "",
  });

  const toggle = async () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  const handleChange = (
    evt: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    await avService.createMaintenance(formData, avId);
    setFormData({
      type: "",
      maintenanceStatus: "In Queue",
      partsCost: 0,
      laborCost: 0,
      date: defaultDate,
      notes: "",
    });
    navigate('/dashboard')
  };

  return (
    <>
      <div>
        <FormGroup className={styles.toggleFormContainer}>
          <FormControlLabel
            control={<Switch onChange={toggle} className={styles.toggle} />}
            label={`${showForm ? "" : "Add Ticket"}`}
            labelPlacement="top"
            className={styles.toggleContainer}
          />
        </FormGroup>
        {showForm ? (
          <form
            className={`${styles.form} ${!showForm && styles.hidden}`}
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend>Maintenance Type</legend>
              <input
                type="text"
                name="type"
                autoComplete="off"
                required
                onChange={handleChange}
                className={styles.input}
              />
            </fieldset>
            <fieldset>
              <legend>Status</legend>
              <select
                name="maintenanceStatus"
                required
                onChange={handleChange}
                className={styles.select}
              >
                <option value={"Completed"}>Completed</option>
                <option value={"In Progress"}>In Progress</option>
                <option value={"In Queue"} selected>
                  In Queue
                </option>
              </select>
            </fieldset>
            <fieldset>
              <legend>Notes</legend>
              <textarea
                name="notes"
                cols={34}
                rows={5}
                autoComplete="off"
                onChange={handleChange}
                className={styles.textarea}
              ></textarea>
            </fieldset>
            <Button onClick={handleSubmit}>Submit</Button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default NewMaintenance;
