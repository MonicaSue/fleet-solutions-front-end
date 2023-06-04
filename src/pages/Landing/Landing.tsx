// npm
import { NavLink } from 'react-router-dom';

// css
import styles from './Landing.module.css'

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
        <main className={styles.loggedInContainer}>
          <h1>hello, {user ? user.name : 'friend'}</h1>
        </main>
      ):(
        <main className={styles.loggedOutBackground}>
          <div className={styles.loggedOutContainer}>
            <div className={styles.intro}>
              <div className={styles.content}>
                <h1>Fleet Solutions</h1>
              </div>
              <div className={styles.loggedOutButtonContainer}>
                <NavLink to="/auth/login">
                  <button className={styles.landingButton}>Log In</button>
                </NavLink>
                <NavLink to="/auth/signup">
                  <button className={styles.landingButton}>Sign Up</button>
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
