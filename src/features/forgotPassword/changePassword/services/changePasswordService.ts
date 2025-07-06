import { apiRequest } from "../../../../service/api";
import type {
  changePasswordRequest,
  changePasswordResponse,
} from "../types/changePassword";

export async function requestChangePassword(
  password: changePasswordRequest,
  id: string
) {
  return await apiRequest<changePasswordResponse>(`/users/update/${id}/`, {
    method: "PATCH",
    data: password,
  });
}
