// npm
import { NavLink } from 'react-router-dom';

// css
import styles from './Landing.module.css'

// mui
import { Button } from '@mui/material';

// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <>
      {user ? (
        <main className={styles.loggedInBackground}>
          <div className={styles.loggedInContainer}>
            <div className={styles.intro}>
              <div className={styles.content}>
                <h1>Hello, {user && user.name}</h1>
                <h3>Review Your:</h3>
              </div>
              <div className={styles.buttonContainer}>
                <NavLink to="/avs">
                  <Button variant="outlined" className={styles.landingButton}>Fleet</Button>
                </NavLink>
                <NavLink to="/dashboard">
                  <Button variant="outlined" className={styles.landingButton}>Dashboard</Button>
                </NavLink>
              </div>
            </div>
          </div>
        </main>
      ):(
        <main className={styles.loggedOutBackground}>
          <div className={styles.loggedOutContainer}>
            <div className={styles.intro}>
              <div className={styles.content}>
                <h1>Fleet Solutions</h1>
              </div>
              <div className={styles.buttonContainer}>
                <NavLink to="/auth/login">
                  <Button variant="outlined" className={styles.landingButton}>Log In</Button>
                </NavLink>
                <NavLink to="/auth/signup">
                <Button variant="outlined" className={styles.landingButton}>Sign Up</Button>
                </NavLink>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default Landing
