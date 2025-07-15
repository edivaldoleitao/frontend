import { useState } from "react";
import type { UpdateAlertPayload, AlertResponse } from "../types/type";
import { updateAlert } from "../services/updateAlert";

export function useUpdateAlert() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AlertResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUpdate(alertId: number, payload: UpdateAlertPayload) {
    setLoading(true);
    setError(null);
    try {
      const response = await updateAlert(alertId, payload);
      setData(response);
      return response;
    } catch (err: any) {
      setError("Erro ao atualizar o alerta");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { update: handleUpdate, loading, data, error };
}
