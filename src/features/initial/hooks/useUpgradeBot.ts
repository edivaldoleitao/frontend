import { useState } from "react";
import type { UpgradeRequest, UpgradeResponse } from "../types/type";
import { upgradeBot } from "../services/chatBotService";

export function useUpgradeBot() {
  const [data, setData] = useState<UpgradeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (params: UpgradeRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await upgradeBot(params);
      setData(response);
      return response;
    } catch (err: any) {
      console.error("Erro ao chamar upgradeBot:", err);
      setError(err?.message || "Erro desconhecido");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    sendRequest,
  };
}
