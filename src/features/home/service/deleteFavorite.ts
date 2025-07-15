import { apiRequest } from "../../../service/api";


export async function deleteFavorite(favoriteId: number): Promise<void> {
  return await apiRequest<void>(`/favorites/delete/${favoriteId}/`, {
    method: "DELETE",
  });
}