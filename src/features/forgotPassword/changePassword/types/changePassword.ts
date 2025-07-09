export interface changePasswordRequest {
  nova_senha: string;
  confirmar_senha: string;
}

export interface changePasswordResponse {
  status: string;
  message: string;
}
