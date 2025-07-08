import { useState } from "react";
import { requestChangePassword } from "../services/changePasswordService";
import { useNavigate, useParams } from "react-router-dom";

export const useChange = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<"error" | "warning" | "success">("success");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!id) {
      return;
    }

    try {
      const changePasswordRequest = {
        nova_senha: password,
        confirmar_senha: confirmPassword,
      };

      await requestChangePassword(changePasswordRequest, id);
      setType("success");
      setError("Senha redefinida com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: any) {
      setType("error");
      setError(error.message || "Erro ao solicitar a ");
    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    type,
    setError,
    handleChange,
  };
};
