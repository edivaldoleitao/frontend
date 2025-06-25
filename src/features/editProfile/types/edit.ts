export interface changePasswordRequest {
  nova_senha: string;
  confirmar_senha: string;
}

export interface changePasswordResponse {
  status: string;
  message: string;
}

export interface changeUserDataRequest {
  name: string;
  email: string;
  categories: string[];
}

export interface changeUserDataResponse {
  id: string;
  name: string;
  email: string;
  created_at: string;
  is_verified: boolean;
  categories: string[];
}
