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

// css
import styles from './Avs.module.css'


// assets
import avIcon from '../../assets/icons/av.svg'



const Avs = (): JSX.Element => {
  const [avs, setAvs] = useState<Av[]>([])

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
        <NewAvForm />
      </div>
      <div className={styles.avs}>
        <AvCardContainer avs={avs} />
      </div>
    </main>
  )
}

export default Avs