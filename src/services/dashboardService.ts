// services
import * as tokenService from './tokenService'

// type
import { Av } from '../types/models'


const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/dashboard`

async function getAllAvs(): Promise<Av[]> {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as Av[]
}

export { getAllAvs }