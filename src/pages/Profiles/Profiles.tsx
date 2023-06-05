// npm modules
import { useState, useEffect } from 'react'

// services
import * as profileService from '../../services/profileService'

// component
import ProfileCard from '../../components/ProfileCard/ProfileCard'

// css
import styles from './Profiles.module.css'

// types
import { Profile } from '../../types/models'

const Profiles = (): JSX.Element => {
  const [profiles, setProfiles] = useState<Profile[]>([])

  useEffect((): void => {
    const fetchProfiles = async (): Promise<void> => {
      try {
        const profileData: Profile[] = await profileService.getAllProfiles()
        setProfiles(profileData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfiles()
  }, [])

  if (!profiles.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }

  return (
    <main className={styles.container}>
      {profiles.map((profile: Profile) => (
        <ProfileCard 
          key={profile.id}
          profile={profile}
        />
      ))}
    </main>
  )
}

export default Profiles
