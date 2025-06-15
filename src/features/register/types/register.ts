

export interface CriarUsuarioRequest{
  name: string;
  email: string;
  password: string;
  categories: string[];
}

export interface CriarUsuarioResponse {
  id: string;
  name: string;
  email: string;
  categories: string[];
}