import { apiRequest } from "../../../service/api";
import type { ProductPriceResponse } from "../types/type";

export async function getProductsWithQuery(query: string): Promise<ProductPriceResponse> {
  return await apiRequest(`/products/search/?q=${encodeURIComponent(query)}`,
    {
      method: "GET",
    }
  );
}
