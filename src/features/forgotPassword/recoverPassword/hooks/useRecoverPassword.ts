import { useState } from "react";
import { requestRecover } from "../services/recoverPasswordService";

export const useRecover = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<"error" | "warning" | "success">("success");

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await requestRecover(email);

      console.log(data);
      setType("success");
      setError("Email enviado! verifique a caixa de e-mail!");
    } catch (error: any) {
      setType("error");
      setError(error.message || "Erro ao solicitar a ");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    loading,
    error,
    type,
    setError,
    handleRecover,
  };
};
