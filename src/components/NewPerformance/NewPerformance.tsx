// npm
import { useState } from "react";
import moment from "moment";

// services
import * as avService from "../../services/avService";

// types
import { PerformanceFormData } from "../../types/forms";

// mui
import { Button, Switch, FormGroup, FormControlLabel } from "@mui/material";

// css
import styles from "./NewPerformance.module.css";

interface NewPerformanceProps {
  avId: number;
}

const NewPerformance = (props: NewPerformanceProps): JSX.Element => {
  const { avId } = props;
  const [showForm, setShowForm] = useState(false);

  const defaultDate = moment.utc(new Date()).format("yyyy-MM-DD");

  const [formData, setFormData] = useState<PerformanceFormData>({
    takeover: 0,
    distance: 0,
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
    await avService.createPerformance(formData, avId);
    setFormData({
      takeover: 0,
      distance: 0,
      date: defaultDate,
      notes: "",
    });
  };

  return (
    <>
      <div>
        <FormGroup className={styles.toggleFormContainer}>
          <FormControlLabel
            control={<Switch onChange={toggle} className={styles.toggle} />}
            label={`${showForm ? "Add Report" : "Add Report"}`}
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
              <legend>Takeover</legend>
              <input
                type="number"
                name="takeover"
                placeholder="# of takeovers"
                autoComplete="off"
                required
                onChange={handleChange}
                className={styles.input}
              />
            </fieldset>
            <fieldset>
              <legend>Distance</legend>
              <input
                type="number"
                name="distance"
                placeholder="# of miles"
                autoComplete="off"
                required
                onChange={handleChange}
                className={styles.input}
              />
            </fieldset>
            <fieldset>
              <legend>Date</legend>
              <input
                type="date"
                name="date"
                required
                onChange={handleChange}
                className={styles.input}
              />
            </fieldset>
            <fieldset>
              <legend>Comments</legend>
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

export default NewPerformance;
