import { apiRequest } from "../../../service/api";

export async function atualizarSenha(userId: string, newPassword: string, confirmNewPassword: string): Promise<void> {
  return await apiRequest(`/update_password/${userId}/`, {
    method: "PUT",
    data: { nova_senha: newPassword, confirmar_senha: confirmNewPassword },
  });
}