// npm modules
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// css
import styles from './Signup.module.css'



// types
import { SignupFormData, PhotoFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'
import { AuthPageProps } from '../../types/props'

const Signup = (props: AuthPageProps): JSX.Element => {
  const { handleAuthEvt } = props
  const navigate = useNavigate()
  const imgInputRef = useRef<HTMLInputElement | null>(null)

  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    role: 'Admin',
    password: '',
    passwordConf: '',
  })
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return
    const file = evt.target.files[0]
    let isFileInvalid = false
    let errMsg = ""
    const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
    const photoFormat = file.name.split('.').at(-1)

    // cloudinary supports files up to 10.4MB each as of May 2023
    if (file.size >= 10485760) {
      errMsg = "Image must be smaller than 10.4MB"
      isFileInvalid = true
    }
    if (photoFormat && !validFormats.includes(photoFormat)) {
      errMsg = "Image must be in gif, jpeg/jpg, png, svg, or webp format"
      isFileInvalid = true
    }
    
    setMessage(errMsg)
    
    if (isFileInvalid && imgInputRef.current) {
      imgInputRef.current.value = ""
      return
    }

    setPhotoData({ photo: evt.target.files[0] })
  }

  const { name, email, role, password, passwordConf } = formData

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      setIsSubmitted(true)
      await authService.signup(formData, photoData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, setMessage)
      setIsSubmitted(false)
    }
  }

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1>Sign Up</h1>
        <p className={styles.message}>{message}</p>
        <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
          <fieldset>
            <legend>Name</legend>
            <input type="text" value={name} name="name" onChange={handleChange} className={styles.input}/>
          </fieldset>
          <fieldset>
            <legend>Email</legend>
            <input
              type="text"
              value={email}
              name="email"
              onChange={handleChange}
              className={styles.input}
            />
          </fieldset>
          <fieldset>
            <legend>Role</legend>
            <select
              name="role"
              value={role}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="Admin">Admin</option>
              <option value="Driver">Driver</option>
              <option value="Mechanic">Mechanic</option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Password</legend>
            <input
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
              className={styles.input}
            />
          </fieldset>
          <fieldset>
            <legend>Confirm Password</legend>
            <input
              type="password"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              className={styles.input}
            />
          </fieldset>
          <fieldset>
            <legend>Upload Photo</legend>
            <input 
              type="file" 
              name="photo" 
              onChange={handleChangePhoto}
              ref={imgInputRef}
              className={styles.input}
            />
          </fieldset>
          <div className={styles.buttons}>
            <Link to="/">
              <button className={styles.button}>CANCEL</button>
            </Link>
            <button
              className={styles.button}
              disabled={ isFormInvalid() || isSubmitted }
            >
              {!isSubmitted ? 'SIGN UP' : '🚀 Sending...'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Signup
