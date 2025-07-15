import { apiRequest } from "../../../service/api";
import type { AlertResponse, UpdateAlertPayload } from "../types/type";


export async function updateAlert(alertId: number, payload: UpdateAlertPayload): Promise<AlertResponse> {
  return await apiRequest<AlertResponse>(`/alerts/update/${alertId}/`, {
    method: "PUT",
    data: payload,
  });
    
}