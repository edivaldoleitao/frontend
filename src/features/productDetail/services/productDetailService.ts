import { apiRequest } from "../../../service/api";
import type { fetchPrdouctResponse } from "../components";

export async function fetchPrdouctData(id_product: number) {
  try {
    return await apiRequest<fetchPrdouctResponse>(`/get_product/${id_product}`);
  } catch (error) {
    console.error("Erro na busca do produto:", error);
    throw new Error("Erro na busca pelo produto.");
  }
}
