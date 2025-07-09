import { useEffect, useState } from "react";
import type { Alert, PriceAlertProps, RequestAlert } from ".";
import type { User } from "../../../context/AuthContext";
import { apiRequest } from "../../../service/api";

export const usePriceAlert = ({ alert, setAlert }: PriceAlertProps) => {
  const [type_alert, setType] = useState<"warning" | "error" | "success">(
    "warning"
  );
  const [priceExpected, setPrice] = useState("");
  const [dateExpire, setDateExpire] = useState("");
  const [error, setError] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("0");
  const [duration, setDuration] = useState<number>(3);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null | undefined>();
  const [product, setProduct] = useState<number>();
  const [url, setURL] = useState<string>("/alerts/create/");
  const [method, setMethod] = useState<"POST" | "PATCH">("POST");

  useEffect(() => {
    if (alert) {
      setURL(`/alerts/update/${alert.id}/`);
      setMethod("PATCH");
      setExpectedPrice(String(alert.desired_price)); // Também inicialize o preço esperado
      setDateExpire(alert.expires_at); // E a data de expiração
    } else {
      // Se não há alerta, reset para criação
      setURL("/alerts/create/");
      setMethod("POST");
      setExpectedPrice("0"); // Reseta o preço esperado para um novo alerta
      setDateExpire(""); // Reseta a data de expiração
    }
  }, [alert]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiRequest<Alert>(`/alerts/delete/${alert?.id}/`, {
        method: "DELETE",
      });

      setAlert(null);
      setPrice("0");
      setDateExpire("");

      setType("success");
      setError("Alerta excluido com sucesso!");
    } catch (error) {
      console.error("Erro na chamada de login:", error);
      setType("error");
      setError(
        "Aconteceu algum problema no sistema, tente novamente mais tarde!"
      );
    } finally {
      setLoading(false);
      return;
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (expectedPrice === "0" || expectedPrice === "0.00") {
      setType("warning");
      setError("Por favor digite o preço.");
      setLoading(false);
      return;
    }

    if (!user) {
      setType("warning");
      setError("É necessário estar logado para criar alertas de preço");
      setLoading(false);
      return;
    }

    const actualDate = new Date().toISOString().slice(0, 10);

    const expireDate = addTime(actualDate, duration);

    const dataRequest: RequestAlert = {
      user_id: user.id,
      product_id: product,
      desired_price: parseFloat(expectedPrice),
      created_at: actualDate,
      expires_at: expireDate,
    };
    try {
      const response = await apiRequest<Alert>(url, {
        method: method,
        data: dataRequest,
      });
      setAlert(response);
      setPrice(String(response.desired_price));
      setDateExpire(String(response.expires_at));

      setType("success");
      setError("Alerta criado com sucesso!");
    } catch (error) {
      console.error("Erro na chamada de login:", error);
      setType("error");
      setError(
        "Aconteceu algum problema no sistema, tente novamente mais tarde!"
      );
    } finally {
      setLoading(false);
      return;
    }
  };

  function addTime(dataString: string, mesesParaAdicionar: number): string {
    const [ano, mes, dia] = dataString.split("-").map(Number);

    const data = new Date(ano, mes - 1, dia);

    data.setMonth(data.getMonth() + mesesParaAdicionar);

    if (data.getDate() !== dia) {
      data.setDate(0);
    }

    return data.toISOString().slice(0, 10);
  }

  return {
    type_alert,
    error,
    setError,
    expectedPrice,
    setExpectedPrice,
    duration,
    setDuration,
    loading,
    setUser,
    setProduct,
    dateExpire,
    setDateExpire,
    priceExpected,
    setPrice,
    handleSave,
    handleDelete,
  };
};
