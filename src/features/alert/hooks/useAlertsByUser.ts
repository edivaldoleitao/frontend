import { useEffect, useState } from "react";
import type { GetAlertByUserResponse } from "../types/type";
import { getAlertByUser } from "../services/getAlertByUser";

export function useAlertsByUser(userId: number) {
  const [data, setData] = useState<GetAlertByUserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const result = await getAlertByUser(userId);
    setData(result);
    setLoading(false);
    setError(null);

    if (!result) {
      setError("Erro ao buscar alertas do usuário");
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return { data, loading, refetch: fetchData };
}

