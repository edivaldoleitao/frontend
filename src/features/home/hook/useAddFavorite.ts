import { useState } from "react";
import { addFavorite } from "../service/addFavorite"; // ajuste o caminho
import type { FavoriteResponse } from "../types/type";

export function useAddFavorite() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState(false);

  const add = async (
    user_id: number,
    product_id: number,
    created_at: string
  ): Promise<FavoriteResponse | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await addFavorite(user_id, product_id, created_at);
      setSuccess(true);
      return result; 
    } catch (err: any) {
      setError(err.message || "Erro ao adicionar favorito");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { add, loading, error, success };
}
