import { useEffect, useState } from "react";
import type { ProductStoreBestRating } from "../types/type";
import { getProductsRating } from "../service/getProductsRating";
import { useAuth } from "../../../context/AuthContext.tsx";

export function useTopRatedProducts(limit = 10) {
  const [data, setData] = useState<ProductStoreBestRating[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchTopProducts = async () => {
      if (!user) {
        setError("Usuário não autenticado");
        setLoading(false);
        return;
      }

      try {
        const result = await getProductsRating(limit, user.id);
        setData(result);
      } catch (err) {
        setError("Erro ao carregar os produtos com melhor avaliação.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, [limit, user]);

  return { data, loading, error };
}
