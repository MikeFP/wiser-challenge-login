export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  name: string;
  id: number;
}

export interface AuthState {
  user: User;
  loading: boolean;
  attempts: number;
  error: any;
}

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
