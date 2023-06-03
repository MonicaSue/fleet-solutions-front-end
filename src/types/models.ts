/* ---------===== custom props ====--------- */

export interface Av {
  vehicleNo: string;
  status: string;
  id: number;
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
