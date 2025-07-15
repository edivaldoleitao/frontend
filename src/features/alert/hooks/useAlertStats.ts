import { useEffect, useState } from "react";
import type { AlertStats } from "../types/type";
import { getAlertStats } from "../services/getAlertStats";

export function useAlertStats(userId: number) {
  const [data, setData] = useState<AlertStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getAlertStats(userId)
      .then(setData)
      .catch(() => setError("Erro ao buscar estatísticas"))
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading, error };
}
