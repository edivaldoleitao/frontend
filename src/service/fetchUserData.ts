import { apiRequest } from "./api";

export interface ResponseUserData {
  id: string;
  name: string;
  email: string;
  categories: string[];
}

export async function FetchUserData(
  accessToken: String | null
): Promise<ResponseUserData> {
  if (accessToken === null) {
    throw new Error("Chave de Acesso Nula");
  } else {
    return await apiRequest<ResponseUserData>("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
