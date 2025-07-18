import { apiRequest } from "../../../service/api";
import type { Product } from "../types/favorite";

export async function getFavorites(user_id: number) {
  return await apiRequest<Product[]>(`/favorites/userList/${user_id}/`);
}
