import { apiRequest } from "../../../service/api";
import type { GetAlertByUserResponse } from "../types/type";


export async function getAlertByUser(userId: number): Promise<GetAlertByUserResponse> {
  return await apiRequest<GetAlertByUserResponse>(`/alerts/user/${userId}`, {
    method: "GET",
  });
}