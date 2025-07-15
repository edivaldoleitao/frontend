import { apiRequest } from "../../../service/api";
import type { UserSpecification } from "../types/type";


export async function getUserSpecificationService(userId: number): Promise<UserSpecification> {
    return await apiRequest(`/users/specification/${userId}/`, {
        method: "GET",
    });
}