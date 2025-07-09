import { useEffect, useState } from "react";
import type {
  AlertCheck,
  AlertCheckResponse,
  ProductData,
  Alert,
} from "../types/productDetail.ts";
import { fetchProductData } from "../services/productDetailService";
import { LogoAmazon, LogoTerabyte, LogoKabum } from "../components/index.ts";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.tsx";
import { apiRequest } from "../../../service/api.ts";

export const useDetail = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type_alert, setType] = useState<"warning" | "error" | "success">(
    "warning"
  );
  const [product, setProduct] = useState<ProductData | null>(null);
  const [imgStore, setImgStore] = useState<string>("");
  const [alert, setAlert] = useState<Alert | null>(null);
  const { user } = useAuth();
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

        if (user) {
          const data: AlertCheck = {
            user_id: user.id,
            product_id: productData.product.id,
          };
          try {
            const response = await apiRequest<AlertCheckResponse>(
              "/alerts/user/",
              {
                method: "POST",
                data: data,
              }
            );
            if (response.alert && response.alert.id) {
              setAlert(response.alert);
            }
          } catch (error) {
            console.error("Erro na busca do alerta:", error);
          }
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
  }, [id, user]);

  return {
    user,
    imgStore,
    product,
    error,
    setError,
    type_alert,
    alert,
    setAlert,
    setType,
    loading,
  };
};
