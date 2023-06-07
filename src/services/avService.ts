// services
import * as tokenService from './tokenService'

// type
import { Av, Maintenance, Performance } from '../types/models'
import { AvFormData, UpdateAvFormData, MaintenanceFormData, PerformanceFormData } from '../types/forms'

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

async function show(id: number): Promise<Av> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json() as Av
}

async function update(formData: UpdateAvFormData, id: number): Promise<Av> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  return await res.json() as Av
}

async function deleteAv(id: number): Promise<Av> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
  })
  return await res.json() as Av
}

async function createPerformance(formData: PerformanceFormData, id: number): Promise<Performance> {
  const res = await fetch(`${BASE_URL}/${id}/performances`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  return await res.json() as Performance
}

async function createMaintenance(formData: MaintenanceFormData, id: number): Promise<Maintenance> {
  const res = await fetch(`${BASE_URL}/${id}/maintenances`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  return await res.json() as Maintenance
}

export { getAllAvs, create, show, update, deleteAv, createMaintenance, createPerformance }