// npm modules 
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Avs from './pages/Avs/Avs'
import Dashboard from './pages/Dashboard/Dashboard'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as avService from './services/avService'

// styles
import './App.css'

// types
import { User, Av } from './types/models'
import { AvFormData } from './types/forms'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const [avs, setAvs] = useState<Av[] | null>(null)
  // const [av, setAv] = useState<Av | null>(null)
  const navigate = useNavigate()
  
  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  useEffect((): void => {
    const fetchAvs = async (): Promise<void> => {
      try {
        const avData: Av[] = await avService.getAllAvs();
        setAvs(avData);
      } catch (error) {
        console.log(error);
      }
    };
    user ? fetchAvs() : setAvs(null);
  }, [user]);
  

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route 
          path="/avs" 
          element={
            <ProtectedRoute user={user}>
              <Avs user={user} avs={avs} setAvs={setAvs}/>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user}/>
            </ProtectedRoute>
          } 
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
