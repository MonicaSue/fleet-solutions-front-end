// npm
import { useState } from "react";

// services
import * as avService from '../../services/avService'

// types
import { AvFormData } from '../../types/forms'

// mui
import { Button, IconButton, TextField, Select, InputLabel, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, FormControl } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';


const NewAvForm = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const [formData, setFormData] = useState<AvFormData>({
    vehicleNo: '',
    status: '',
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

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault()
    setOpen(false)
    await avService.create(formData)
    setFormData({
      vehicleNo: '',
      status: '',
    })
  }

  return (
    <>
      <IconButton
        id="button"
        onClick={handleClickOpen}
      >
        <AddBoxIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New AV to your Fleet</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <TextField
                name="vehicleNo"
                type="text"
                autoComplete="off"
                margin="normal"
                required
                label="Vehicle Number"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                name="status"
                labelId="status-label"
                label="Status"
                required
                onChange={handleChange}
              >
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Inactive"}>Inactive</MenuItem>
                <MenuItem value={"Under Maintenance"}>Under Maintenance</MenuItem>
                <MenuItem value={"Retired"}>Retired</MenuItem>
              </Select>
            </FormControl>
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