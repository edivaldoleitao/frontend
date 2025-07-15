import { apiRequest } from "../../../service/api";
import type { ProductPriceResponse } from "../types/type";

type Filters = {
  seller?: string;
  rating?: string;
  price?: string; 
  brand?: string;
};

export async function getProductsWithQuery(
  query: string,
  category?: string,
  limit: number = 10,
  offset: number = 0,
  userId?: number,
  filters?: Filters
): Promise<ProductPriceResponse> {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.append("name", query.trim());
  }

  if (category?.trim()) {
    params.append("category", category.trim());
  }

  params.append("limit", limit.toString());
  params.append("offset", offset.toString());
  params.append("user_id", userId?.toString() || "0");

  if (filters) {
    if (filters.seller) {
      params.append("seller", filters.seller);
    }

    if (filters.rating) {
      params.append("rating", filters.rating);
    }

    if (filters.price) {
      const [min, max] = filters.price.split("-");
      if (min) params.append("price_min", min);
      if (max) params.append("price_max", max);
    }

    if (filters.brand) {
      params.append("brand", filters.brand);
    }
  }

  return await apiRequest(`/prices/search/?${params.toString()}`, {
    method: "GET",
  });
}
