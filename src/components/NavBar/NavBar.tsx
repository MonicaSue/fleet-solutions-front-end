// npm modules
import { NavLink } from 'react-router-dom'
import { useState, useRef } from 'react'

// types
import { User } from '../../types/models'

// css
import styles from './NavBar.module.css'

// mui

// import { ClickAwayListener, IconButton, MenuList, Popper, Paper, MenuItem } from '@mui/material'
// import PersonIcon from '@mui/icons-material/Person'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props

  // const [open, setOpen] = useState(false)
  // const anchorRef = useRef(null)

  // const handleClick = () => {
  //   setOpen((prevOpen) => !prevOpen)
  // }
  // const handleClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return
  //   }
  //   setOpen(false)
  // }
  
  return (
    <>
      {user ? (
        <nav className={styles.navContainer}>
            <ul className={styles.linkContainer}>
              <li>FleetSolutions</li>
              <li><NavLink to="/avs">AVs</NavLink></li>
              <li><NavLink to="/profiles">Profiles</NavLink></li>
              <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
              <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
            </ul>
          :
            <ul>
              <li><NavLink to="/auth/login">Log In</NavLink></li>
              <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
            </ul>
          
        </nav>
      ):(
        ''
      )}
    </>
  )
}

export default NavBar
