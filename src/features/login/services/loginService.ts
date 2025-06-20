import axios from "axios";
import type {
  AuthCredentials,
  AuthResponse,
  DjangoAuthCredentials,
} from "../types/login.ts";

const API_BASE_URL = import.meta.env.VITE_URL_DJANGO_API;

const API_URL = `${API_BASE_URL}/login/`;

export const loginApi = async (
  credentials: AuthCredentials
): Promise<AuthResponse> => {
  const apiCredentials: DjangoAuthCredentials = {
    email: credentials.email,
    password: credentials.password,
  };

  try {
    const response = await axios.post(API_URL, apiCredentials);
    return response.data;
  } catch (error) {
    console.error("Erro na chamada de login:", error);
    throw new Error("Email ou senha inválidos.");
  }
};
