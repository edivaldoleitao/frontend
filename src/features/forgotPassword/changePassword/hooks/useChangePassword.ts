import { useEffect, useState } from "react";
import { requestChangePassword } from "../services/changePasswordService";
import { useNavigate, useParams } from "react-router-dom";

export const useChange = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<"error" | "warning" | "success">("success");
  const { id } = useParams();
  const [countdown, setCountdown] = useState(0);
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
      setCountdown(5);
    } catch (error: unknown) {
      setType("error");
      if (error && typeof error === "object" && "message" in error) {
        setError((error as { message: string }).message || "Erro ao solicitar a mudança de senha.");
      } else {
        setError("Erro ao solicitar a mudança de senha.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && type === 'success') {
      navigate("/login");
    }
  }, [countdown, type, navigate]);

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
    countdown,
  };
};
