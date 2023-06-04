// services
import * as tokenService from './tokenService'

// type
import { Av } from '../types/models'
import { AvFormData, UpdateAvFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/avs`

async function getAllAvs(): Promise<Av[]> {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as Av[]
}

async function create(formData: AvFormData): Promise<Av> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  return await res.json() as Av
}

async function update(formData: UpdateAvFormData, id: number): Promise<Av> {
  try {  
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    return await res.json() as Av
  } catch(error) {
    console.log(error)
  }
}

export { getAllAvs, create, update }