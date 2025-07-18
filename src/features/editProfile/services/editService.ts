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
  return await apiRequest<changePasswordResponse>(
    `/users/update_password/${id}/`,
    {
      method: "PATCH",
      data: password,
    }
  );
}

export async function changeUserData(
  userData: changeUserDataRequest,
  id: number
) {
  return await apiRequest<changeUserDataResponse>(`/users/update/${id}/`, {
    method: "PATCH",
    data: userData,
  });
}

export async function deleteUser(id: number) {
  return await apiRequest<changeUserDataResponse>(`/users/delete/${id}/`, {
    method: "DELETE",
  });
}
