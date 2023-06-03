// npm
import { useState, useEffect } from 'react';

// services
import * as avService from '../../services/avService'

// types
import { Av } from '../../types/models'

// css
import styles from './Avs.module.css'

// mui
import { Button, IconButton, TextField, Select, InputLabel, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, FormControl } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

// assets
import avIcon from '../../assets/icons/av.svg'



const Avs = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const [avs, setAvs] = useState<Av[]>([])

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  useEffect((): void => {
    const fetchAvs = async (): Promise<void> => {
      try {
        const avData: Av[] = await avService.getAllAvs()
        setAvs(avData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAvs()
  }, [])

  return (
    <main className={styles.container}>
      <div className={styles.searchAdd}>
        {/* <form action=""></form> */}
        <IconButton
          id="button"
          onClick={handleClickOpen}
        >
          <AddBoxIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add an AV to Your Fleet </DialogTitle>
          <DialogContent>
            <form>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <TextField
                  type="text"
                  autoComplete="off"
                  margin="normal"
                  required
                  name="vehicleNo"
                  label="Vehicle Number"
                  // value={vehicleNo}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select 
                  labelId="status-label"
                  label="Status"
                  required
                  // value={status}
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
            <Button onClick={handleClose}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={styles.avContainer}>
        {avs.map((av: Av) => (
          <img key={av.id} src={avIcon} alt="Vehicle" />
        ))}
      </div>
    </main>
  )
}

export default Avs