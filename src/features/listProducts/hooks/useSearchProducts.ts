import { useEffect, useState } from "react";
import type { ProductWithPrice } from "../types/type";
import { getProductsWithQuery } from "../services/getProductsWithQuery";

export function useSearchProducts(query: string) {
  const [products, setProducts] = useState<ProductWithPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!query) {
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const result = await getProductsWithQuery(query);
        if (isMounted) {
          setProducts(result.products || []);
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
  }, [query]);

  return { products, loading, error };
}
