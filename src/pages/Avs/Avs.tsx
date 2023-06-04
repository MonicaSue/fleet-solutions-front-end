// npm
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// services
import * as avService from '../../services/avService'

// types
import { Av } from '../../types/models'

// components
import NewAvForm from '../../components/NewAvForm/NewAvForm';
import AvCardContainer from '../../components/AvCardContainer/AvCardContainer';
import NewReport from '../../components/NewReport/NewReport';

// css
import styles from './Avs.module.css'


const Avs = (): JSX.Element => {
  const [avs, setAvs] = useState<Av[]>([])
  const [selectedAv, setSelectedAv] = useState<Av[] | null>(null)

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

  // const handleUpdateAv = async ()
  // const handleSelectedAv = (evt: React.MouseEvent<HTMLImageElement>): void => {
    
  // }

  return (
    <main className={styles.container}>
      <div className={styles.searchAdd}>
        <NewAvForm />
      </div>
      <div className={styles.avs}>
        <div className={styles.cars}>
          <AvCardContainer avs={avs} selectedAv={selectedAv} />
        </div>
        <div className={styles.report}>
          <NewReport selectedAv={selectedAv}/>
        </div>
      </div>
    </main>
  )
}

export default Avs