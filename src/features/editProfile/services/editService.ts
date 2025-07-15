import type {
  changePasswordRequest,
  changePasswordResponse,
  changeUserDataRequest,
  changeUserDataResponse,
} from "../types/edit";
import { apiRequest } from "../../../service/api";

export async function changePassword(
  password: changePasswordRequest,
  id: number
) {
  return await apiRequest<changePasswordResponse>(`/update_password/${id}/`, {
    method: "PATCH",
    data: password,
  });
}

export async function changeUserData(
  userData: changeUserDataRequest,
  id: number
) {
  return await apiRequest<changeUserDataResponse>(`/update_user/${id}/`, {
    method: "PATCH",
    data: userData,
  });
}

export async function deleteUser(id: number) {
  return await apiRequest<changeUserDataResponse>(`/delete_user/${id}/`, {
    method: "DELETE",
  });
}
