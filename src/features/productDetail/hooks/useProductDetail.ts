import { useEffect, useState } from "react";
import type { ProductData } from "../components";
import { fetchProductData } from "../services/productDetailService";
import { useParams } from "react-router-dom";

export const useDetail = () => {
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductData | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("ID do produto não encontrado");
        return;
      }

      try {
        const productData = await fetchProductData(Number(id));
        setProduct(productData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro inesperado");
        }
      }
    };
    fetchData();
  }, [id]);

  return {
    product,
    error,
  };
};
