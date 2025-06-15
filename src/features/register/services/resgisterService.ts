import type { CriarUsuarioRequest, CriarUsuarioResponse } from "../types/register";
import { apiRequest } from "../../../service/api";

export async function criarUsuario(usuario: CriarUsuarioRequest): Promise<CriarUsuarioResponse> {
  return await apiRequest<CriarUsuarioResponse>("/create_user/", {
    method: "POST",
    data: usuario,
  });
}
