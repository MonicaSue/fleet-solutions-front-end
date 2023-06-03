// npm
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// services
import * as avService from '../../services/avService'

// types
import { Av } from '../../types/models'
import { AvFormData } from '../../types/forms';

// css
import styles from './Avs.module.css'

// mui
import { Button, IconButton, TextField, Select, InputLabel, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, FormControl } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

// assets
import avIcon from '../../assets/icons/av.svg'



const Avs = (): JSX.Element => {
  // const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false)
  const [avs, setAvs] = useState<Av[]>([])
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

  const { vehicleNo, status } = formData

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

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    await avService.create(formData)
    setOpen(false)
    setFormData({
      vehicleNo: '',
      status: '',
    })
    // navigate('/avs')
  }

  return (
    <main className={styles.container}>
      <div className={styles.searchAdd}>
        <IconButton
          id="button"
          onClick={handleClickOpen}
        >
          <AddBoxIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add an AV to Your Fleet </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <TextField
                  type="text"
                  autoComplete="off"
                  margin="normal"
                  required
                  name="vehicleNo"
                  label="Vehicle Number"
                  value={vehicleNo}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select 
                  name='status'
                  labelId="status-label"
                  label="Status"
                  required
                  value={status}
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