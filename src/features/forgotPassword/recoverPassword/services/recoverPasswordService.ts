import { apiRequest } from "../../../../service/api";

export async function requestRecover(email: string) {
  return await apiRequest(`TODO: ADD Caminho para criar a solicitação`, {
    data: email,
  });
}
