import { apiRequest } from "../../../service/api";
import type { ProductData } from "../types/productDetail";

export async function fetchProductData(id_price: number) {
  try {
    return await apiRequest<ProductData>(`/product_stores/details/${id_price}`);
  } catch (error) {
    console.error("Erro na busca do produto:", error);
    throw new Error("Erro na busca pelo produto.");
  }
}
