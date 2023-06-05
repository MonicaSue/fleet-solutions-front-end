// npm
import { useEffect, useState } from 'react'

// service
import * as avService from '../../services/avService'

// types
import { User } from '../../types/models'
import { UpdateAvFormData } from '../../types/forms'

// css
import styles from './Report.module.css'

// mui
import { Button } from '@mui/material'

interface ReportProps {
  selectedAvId: string
  user: User | null;
  handleDeleteAv: (avId: number) => Promise<void>
}


const Report = (props: ReportProps) => {
  const { selectedAvId, user, handleDeleteAv } = props

  const avId = parseInt(selectedAvId)

  const [formData, setFormData] = useState<UpdateAvFormData>({
    vehicleNo: '',
    status: '',
  })
  
  useEffect((): void => {
    const fetchDetails = async (): Promise<void> => {
      try {
        const avData = await avService.show(avId)
        setFormData(avData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDetails()
  }, [avId])

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = async (evt: React.FormEvent) => {
    // evt.preventDefault()
    await avService.update(formData, avId)
  }

  
  
  return (
    <>
      
        {avId ? (
          <div className={styles.container}>
            <h1>{formData.vehicleNo}</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              <fieldset>
                <legend>Vehicle Id</legend>
                <input 
                  type='text'
                  name='vehicleNo'
                  value={formData.vehicleNo}
                  autoComplete='off'
                  required
                  onChange={handleChange}
                  className={styles.input}
                />
              </fieldset>
              <fieldset>
                <legend>Status</legend>
                <select 
                  name="status"
                  value={formData.status} 
                  className={styles.select}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                  <option value="Retired">Retired</option>
                </select>
              </fieldset>
              <div className={styles.buttons}>
                <Button onClick={handleSubmit} type="submit" variant="contained">Save</Button>
                <Button onClick={() => handleDeleteAv(avId)} variant="contained">Delete</Button>
              </div>
            </form>
          </div>
        ):( 
          <h1>Select an AV</h1>
        )}
        <h1>AV Log</h1>
        <h3>Performance Report</h3>
    </>
  )
}

export default Report