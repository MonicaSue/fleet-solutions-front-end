/* ---------===== custom props ====--------- */

export interface Av {
  vehicleNo: string;
  status: string;
  profileId: number,
  id: number;
  createdAt: string;
  updatedAt: string;
  maintenances: Maintenance[];
  performances: Performance[];
}

export interface Performance {
  takeover: number;
  distance: number;
  date: Date;
  notes: string;
  profileId: number;
  avId: number;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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
