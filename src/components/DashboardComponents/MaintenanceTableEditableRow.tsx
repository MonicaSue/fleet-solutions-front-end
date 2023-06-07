// css
import styles from './DashboardComponent.module.css'

interface MaintenanceTableEditableRowProps {
  handleChange: (evt: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >) => void
    handleSubmit: () => void
}

const MaintenanceTableEditableRow = (props: MaintenanceTableEditableRowProps) => {
  const { handleChange, handleSubmit } = props

  return (
    <>
      <tr>
        <td></td>
        <td>
          <input 
            type="text" 
            name="type"
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
            autoComplete="off"
            required
            className={styles.input}
            onChange={handleChange}
          />
        </td>
        <td>
          <select 
            name="maintenanceStatus"
            required
            className={styles.select}
            onChange={handleChange}
          >
            <option value={"Completed"}>Completed</option>
            <option value={"In Progress"}>In Progress</option>
            <option value={"In Queue"}>In Queue</option>
          </select>
        </td>
        <td></td>
        <td>
          <input 
            type="date"
            name="date"
            required
            className={styles.input}
            onChange={handleChange}
          />
        </td>
        <td>
          <textarea 
            name="notes"
            autoComplete="off"
            required
            className={styles.textarea}
            onChange={handleChange}
          />
        </td>
        <td><button onClick={handleSubmit} type='submit'>Save</button></td>
      </tr>
    </>
  )
}

export default MaintenanceTableEditableRow