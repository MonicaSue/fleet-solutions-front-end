/* ---------===== custom props ====--------- */

export type SetAvs = React.Dispatch<React.SetStateAction<Av[]>>

export interface Av {
  vehicleNo: string;
  status: string;
  profileId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  maintenances: Maintenance[];
  performances: Performance[];
}

export interface Performance {
  takeover: number;
  distance: number;
  date: string;
  notes: string;
  profileId: number;
  avId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
  [key: string]: string | number;
}

export interface Maintenance {
  type: string;
  partsCost: number;
  laborCost: number;
  date: string;
  notes: string;
  maintenanceStatus: string;
  profileId: number;
  avId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Takeover {
  takeover: number;
  date: string;
}

export interface Service {
  type: string;
  partsCost: number;
  laborCost: number
}

/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  role: string;
  isActive: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
}
