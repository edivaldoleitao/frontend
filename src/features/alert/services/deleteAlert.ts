import { apiRequest } from "../../../service/api";


export async function deleteAlert(alertId: number): Promise<void> {
    return await apiRequest<void>(`/alerts/delete/${alertId}/`, {
        method: "DELETE",
    });
}