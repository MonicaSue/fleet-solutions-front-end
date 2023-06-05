// npm modules
import { NavLink } from 'react-router-dom'
import { useState, useRef } from 'react'

// types
import { User } from '../../types/models'

// css
import styles from './NavBar.module.css'

// mui
import { ClickAwayListener, IconButton, MenuList, Popper, Paper, MenuItem } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

interface NavBarProps {
  user: User | null;
  handleLogout: () => void;
}

const NavBar = (props: NavBarProps): JSX.Element => {
  const { user, handleLogout } = props

  const [open, setOpen] = useState<boolean>(false)
  const anchorRef = useRef(null)

  const handleClick = (): void => {
    setOpen((prevOpen) => !prevOpen)
  }
  const handleClose = (event: React.MouseEvent): void => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }
  
  return (
    <>
      {user ? (
        <nav className={styles.navContainer}>
            <ul className={styles.linkContainer}>
              <li>FleetSolutions</li>
              <li><NavLink to="/avs">AVs</NavLink></li>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              {user.role === 'Admin' ?
              <li><NavLink to="/profiles">Profiles</NavLink></li>
              :
              ''
              }
            </ul>
            <div className={styles.profile}>
              <IconButton
                ref={anchorRef}
                id="button"
                aria-controls={open ? 'menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                color="neutral"
                onClick={handleClick}
              >
                <PersonIcon className={styles.personIcon}/>
                <em>{user.role}</em>
              </IconButton>
              <Popper
                id="menu"
                anchorEl={anchorRef.current}
                open={open}
                onClose={handleClose}
                aria-labelledby="button"
                placement="bottom-end"
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <Paper>
                    <MenuList>
                      <NavLink to="/auth/change-password" className={styles.loggedIn}>
                        <MenuItem onClick={handleClose}>Change Password</MenuItem>
                      </NavLink>
                      <NavLink to="" onClick={handleLogout} className={styles.loggedIn}>
                        <MenuItem onClick={handleClose}>Log Out</MenuItem>
                      </NavLink>
                    </MenuList>
                  </Paper>
                </ClickAwayListener>
              </Popper>
            </div>
        </nav>
      ):(
        ''
      )}
    </>
  )
}

export default NavBar
