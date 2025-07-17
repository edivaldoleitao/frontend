import { useEffect, useState } from "react";
import { getFavorites } from "../services/favoriteService.ts";
import { useAuth } from "../../../context/AuthContext.tsx";
import type { Product } from "../types/favorite.ts";
import { useParams } from "react-router-dom";
import { url_base } from "../components/index.ts";

export const useFavorite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [type_alert, setType] = useState<"warning" | "error" | "success">(
    "warning"
  );

  const [url, setUrl] = useState(url_base);
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async (user_id: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getFavorites(user_id);
        setProducts(response);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar os dados");
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchFavorites(parseInt(id));

      setUrl(url_base + id);

      if (user && user.id === parseInt(id)) {
        setEdit(true);
      }

      return;
    }

    if (!id && user) {
      setUrl(url_base + user.id);
      fetchFavorites(user.id);
      setEdit(true);
      return;
    }

    setType("warning");
    setError(
      "Você precisa estar logado para verificar sua lista de favoritos!"
    );
  }, [user, id]);

  return {
    error,
    setError,
    type_alert,
    setType,
    isLoading,
    products,
    id,
    edit,
    url,
    user,
  };
};
