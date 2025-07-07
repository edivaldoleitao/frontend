import { apiRequest } from "../../../service/api";

export async function recuperarSenha(email: string): Promise<void> {
  return await apiRequest("/users/recover_password/", {
    method: "POST",
    data: { email },
  });
}