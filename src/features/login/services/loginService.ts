import axios from "axios";
import type {
  AuthCredentials,
  AuthResponse,
  DjangoAuthCredentials,
} from "../types/login.ts";

const API_URL = "http://localhost:8001/api/login/";

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
