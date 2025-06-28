import { useState } from "react";
import { changePassword, changeUserData } from "../services/editService";

export const useEdit = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
        await changePassword(changePasswordRequest, id);
      }

      const userData = {
        name,
        email,
        categories: selectedCategories,
      };

      await changeUserData(userData, id);
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar dados");
      return null;
    } finally {
      setIsLoading(false);
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
  };
};
