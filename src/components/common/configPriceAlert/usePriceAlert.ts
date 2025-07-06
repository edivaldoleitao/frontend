import { useState } from "react";
import type { PriceAlertRequest } from ".";
import axios from "axios";

export const usePriceAlert = () => {
  const [type_alert, setType] = useState<"warning" | "error" | "success">(
    "warning"
  );
  const [error, setError] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [duration, setDuration] = useState("3");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_URL_DJANGO_API;

  const API_URL = `${API_BASE_URL}/TODO/`;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!expectedPrice) {
      setType("warning");
      setError("Por favor digite o preço.");
      setLoading(false);
      return;
    }

    const APIdata: PriceAlertRequest = {
      expectedPrice: Number(expectedPrice.replace(",", ".")),
      duration: Number(duration),
    };

    try {
      const response = await axios.post(API_URL, APIdata);
      return response.data;
    } catch (error) {
      console.error("Erro na chamada de login:", error);
      setType("error");
      setError(
        "Aconteceu algum problema no sistema, tente novamente mais tarde!"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    type_alert,
    error,
    setError,
    expectedPrice,
    setExpectedPrice,
    duration,
    setDuration,
    loading,
    handleSave,
  };
};
