import { useEffect, useState } from "react";
import type { ProductWithPrice } from "../types/type";
import { getProductsWithQuery } from "../services/getProductsWithQuery";
import { useAuth } from "../../../context/AuthContext.tsx";

type Filters = {
  seller?: string;
  rating?: string;
  price?: string;
  brand?: string;
};

export function useSearchProducts(
  name?: string,
  category?: string,
  page: number = 1,
  perPage: number = 10,
  filters?: Filters
) {
  const [products, setProducts] = useState<ProductWithPrice[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const shouldFetch = name?.trim() || category?.trim() || (!name && !category);

    if (!shouldFetch) {
      setProducts([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const offset = (page - 1) * perPage;

        const result = await getProductsWithQuery(
          name?.trim() || "",
          category,
          perPage,
          offset,
          user?.id,
          filters 
        );

        if (isMounted) {
          setProducts(result.products || []);
          setTotal(result.total || 0);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Erro ao buscar produtos");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [name, category, page, perPage, JSON.stringify(filters)]); // ✅ adiciona filtros na dependência

  return { products, total, loading, error };
}
