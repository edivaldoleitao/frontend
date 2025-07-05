import { apiRequest } from "../../../service/api";
import type { ProductData } from "../components";

export async function fetchProductData(id_price: number) {
  try {
    return await apiRequest<ProductData>(`/get_product_details/${id_price}`);
  } catch (error) {
    console.error("Erro na busca do produto:", error);
    throw new Error("Erro na busca pelo produto.");
  }
}
