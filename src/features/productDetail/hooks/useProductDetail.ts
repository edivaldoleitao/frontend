import { useEffect, useState } from "react";
import type { ProductData } from "../types/productDetail.ts";
import { fetchProductData } from "../services/productDetailService";
import { LogoAmazon, LogoTerabyte, LogoKabum } from "../components/index.ts";
import { useParams } from "react-router-dom";

export const useDetail = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type_alert, setType] = useState<"warning" | "error" | "success">(
    "warning"
  );
  const [product, setProduct] = useState<ProductData | null>(null);
  const [imgStore, setImgStore] = useState<string>("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const productData = await fetchProductData(Number(id));
        setProduct(productData);

        if (productData.product_store.store === 1) {
          setImgStore(LogoAmazon);
        } else if (productData.product_store.store === 2) {
          setImgStore(LogoKabum);
        } else if (productData.product_store.store === 3) {
          setImgStore(LogoTerabyte);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setType("error");
          setError("Ocorreu um erro inesperado");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return {
    imgStore,
    product,
    error,
    setError,
    type_alert,
    setType,
    loading,
  };
};
