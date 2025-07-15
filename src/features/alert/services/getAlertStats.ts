import { apiRequest } from "../../../service/api";
import type { AlertStats } from "../types/type";

export async function getAlertStats(userId: number): Promise<AlertStats> {
  return await apiRequest<AlertStats>(`/alerts/stats/${userId}`, {
    method: "GET",
  });
}
