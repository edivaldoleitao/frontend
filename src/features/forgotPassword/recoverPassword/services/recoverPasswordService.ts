import { apiRequest } from "../../../../service/api";

export async function requestRecover(email: string) {
  return await apiRequest(`/users/recover_password/`, {
    method: "POST",
    data: { email: email },
  });
}
