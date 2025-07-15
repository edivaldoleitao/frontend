import { apiRequest } from "../../../service/api";
import type { FavoriteResponse } from "../types/type";


export async function addFavorite(user_id: number, product_id: number, created_at: string): Promise<FavoriteResponse> {
  const dateOnly = created_at.slice(0, 10); // garante o formato esperado
  console.log("Adding favorite:", { user_id, product_id, created_at: dateOnly });

  return await apiRequest(`/favorites/create/`, {
    method: "POST",
    data: { user_id, product_id, created_at: dateOnly },
  });
}
