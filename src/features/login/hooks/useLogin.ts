import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/loginService.ts";
import type { AuthCredentials } from "../types/login.ts";

export const useLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const credentials: AuthCredentials = { email, password };

    try {
      const data = await loginApi(credentials);

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      navigate("/home"); //URL pag principal
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
  };
};
