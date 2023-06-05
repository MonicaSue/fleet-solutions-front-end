// npm
import { useState, useEffect } from 'react';

// services
import * as avService from '../../services/avService'

// types
import { Av } from '../../types/models'
import { User } from '../../types/models'

// components
import NewAvForm from '../../components/NewAvForm/NewAvForm';
import AvCardContainer from '../../components/AvCardContainer/AvCardContainer';
import Report from '../../components/Report/Report';

// css
import styles from './Avs.module.css'

interface AvsProps {
  user: User | null;
}

const Avs = (props: AvsProps): JSX.Element => {
  const { user } = props
  
  const [avs, setAvs] = useState<Av[]>([])
  const [selectedAvId, setSelectedAvId] = useState<string>('')
  
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

  const handleDeleteAv = async (avId: number) => {
    const deletedAv = await avService.deleteAv(avId)
    setAvs(avs.filter((av) => av.id !== deletedAv.id))
  }

  return (
    <main className={styles.container}>
      <div className={styles.searchAdd}>
        <NewAvForm />
      </div>
      <div className={styles.avs}>
        <div className={styles.cars}>
          <AvCardContainer avs={avs} setSelectedAvId={setSelectedAvId} />
        </div>
        <div className={styles.report}>
          <Report 
            selectedAvId={selectedAvId}
            user={user}
            handleDeleteAv={handleDeleteAv}
          />
        </div>
      </div>
    </main>
  )
}

export default Avs