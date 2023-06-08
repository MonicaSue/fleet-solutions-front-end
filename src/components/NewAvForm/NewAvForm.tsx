// npm
import { useState } from "react";

// services
import * as avService from '../../services/avService'

// types
import { AvFormData } from '../../types/forms'

// styles
import styles from './NewAvFrom.module.css'

// mui
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';


const NewAvForm = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const [formData, setFormData] = useState<AvFormData>({
    vehicleNo: '',
    status: 'Active',
  })

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async () => {
    setOpen(false)
    await avService.create(formData)
    setFormData({
      vehicleNo: '',
      status: 'Active',
    })
    window.location.reload()
  }

  return (
    <>
      <IconButton
        id="button"
        onClick={handleClickOpen}
      >
        <AddBoxIcon sx={{ fontSize: 50 }}/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New AV to your Fleet</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} >
            <fieldset>
              <legend>Vehicle Id *</legend>
              <input
                name="vehicleNo"
                type="text"
                autoComplete="off"
                required
                onChange={handleChange}
                className={styles.input}
              />
            </fieldset>
            <fieldset>
              <legend>Status *</legend>
              <select
                name="status"
                required
                onChange={handleChange}
                className={styles.select}
              >
                <option value={"Active"} selected>Active</option>
                <option value={"Inactive"}>Inactive</option>
                <option value={"Under Maintenance"}>Under Maintenance</option>
                <option value={"Retired"}>Retired</option>
              </select>
            </fieldset>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewAvForm