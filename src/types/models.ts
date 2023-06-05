/* ---------===== custom props ====--------- */

export interface Av {
  vehicleNo: string;
  status: string;
  profileId: number,
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Performance {
  takeover: number;
  distance: number;
  date: Date;
  notes: string;
  profileId: number;
  avId: number;
}

export interface Maintenance {
  type: string;
  partsCost: number;
  laborCost: number;
  date: Date;
  notes: string;
  maintenanceStatus: string;
  profileId: number;
  avId: number;
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
