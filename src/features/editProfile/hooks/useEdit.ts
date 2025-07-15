import { useState } from "react";
import {
  changePassword,
  changeUserData,
  deleteUser,
} from "../services/editService";
import { useNavigate } from "react-router-dom";

export const useEdit = () => {
  const [id, setId] = useState<number>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (password || confirmPassword) {
        const changePasswordRequest = {
          nova_senha: password,
          confirmar_senha: confirmPassword,
        };
        if (id) {
          await changePassword(changePasswordRequest, id);
        }
      }

      const userData = {
        name,
        email,
        categories: selectedCategories,
      };
      if (id) {
        await changeUserData(userData, id);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar dados");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleExclusion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      if (id) {
        await deleteUser(id);
      }
    } catch (err: any) {
      setError("Erro ao deletar a conta");
      return null;
    } finally {
      setIsLoading(false);
      navigate("/login");
    }
  };

  return {
    setId,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    selectedCategories,
    setSelectedCategories,
    error,
    setError,
    isLoading,
    handleEdit,
    handleExclusion,
  };
};
