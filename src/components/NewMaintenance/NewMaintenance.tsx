// npm
import { useState } from "react"

// services
import * as avService from '../../services/avService'

// mui
import { Button, Switch, FormGroup, FormControlLabel } from "@mui/material"

// css
import styles from './NewMaintenance.module.css'

const NewMaintenance = () => {
  const [showForm, setShowForm] = useState(false)

  const toggle = async () => {
    showForm ? setShowForm(false) : setShowForm(true)
  }

  const handleSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault()
    await avService.create(formData)
    // props.handleAddActivity(formData)
    // setFormData({
    //   category: 'Activity',
    //   name: '',
    //   activityDate: defaultDate,
    //   activityWebsite: '',
    //   notes: '',
    //   cost: '',
    // })
  }
  
  return (
    <>
      <div>
        <FormGroup className={styles.toggleFormContainer}>
          <FormControlLabel
            control={<Switch onChange={toggle} className={styles.toggle} />}
            label={`${showForm ? 'Add Report' : 'Add Report'}`}
            labelPlacement='top'
            className={styles.toggleContainer}
          />
        </FormGroup>
        {showForm ? 
          <form className={`${styles.form} ${!showForm && styles.hidden}`} onSubmit={handleSubmit}>
            <fieldset>
              <legend>Type</legend>
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
                <option value={"In Queue"}>In Queue</option>
              </select>
            </fieldset>
            <fieldset>
              <legend>Parts Cost</legend>
              <input 
                type="number"
                name="partsCost"
                required
                autoComplete="off"
                onChange={handleChange}
                className={styles.input}
              />
            </fieldset>
            <fieldset>
              <legend>Labor Cost</legend>
              <input 
                type="number"
                name="laborCost"
                required
                autoComplete="off"
                onChange={handleChange}
                className={styles.input}
              />
            </fieldset>
            <fieldset>
              <legend>Date Scheduled</legend>
            </fieldset>
            <fieldset>
              <legend>Notes</legend>
              <textarea 
                name="notes"
                cols="34" 
                rows="5"
                autoComplete="off"
                onChange={handleChange}
                className={styles.textarea}
              >
              </textarea>
            </fieldset>
            <Button onClick={handleSubmit}>Submit</Button>
          </form>
        :
          <></>
        }
      </div>
    </>
  )
}

export default NewMaintenance