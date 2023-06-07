/* ---------==== custom forms ====--------- */

export interface AvFormData {
  vehicleNo: string;
  status: string;
}

export interface UpdateAvFormData {
  vehicleNo: string;
  status: string;
}

export interface PerformanceFormData {
  takeover: number;
  distance: number;
  date: string;
  notes: string;
}

export interface UpdatePerformanceFormData {
  takeover: number;
  distance: number;
  date: string;
  notes: string;
}

export interface MaintenanceFormData {
  type: string;
  maintenanceStatus: string;
  partsCost: number;
  laborCost: number;
  date: string;
  notes: string;
}

export interface UpdateMaintenanceFormData {
  type: string;
  maintenanceStatus: string;
  partsCost: number;
  laborCost: number;
  date: string;
  notes: string;
}

/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  role: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  curPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}
