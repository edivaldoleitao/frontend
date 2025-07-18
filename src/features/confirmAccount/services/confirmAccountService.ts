import { apiRequest } from "../../../service/api";
import type { confirmAccountResponse } from "../types/confirmAccount";

export async function requestConfirmAccount(
  id: string
) {
  return await apiRequest<confirmAccountResponse>(
    `/users/confirm_email/${id}/`,
    {
      method: "GET",
    }
  );
}
