/* ---------==== custom forms ====--------- */

export interface AvFormData {
  vehicleNo: string;
  status: string;
}

export interface UpdateAvFormData {
  vehicleNo: string;
  status: string;
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
