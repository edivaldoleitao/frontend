import { apiRequest } from "../../../service/api";
import type { ProductStoreBestRating } from "../types/type";

export async function getProductsRating(limit: number, userId: number): Promise<Array<ProductStoreBestRating>> {
  return await apiRequest<Array<ProductStoreBestRating>>(`/products/best_rating/?limit=${limit}&user_id=${userId}`, {
    method: "GET",
  });
}
