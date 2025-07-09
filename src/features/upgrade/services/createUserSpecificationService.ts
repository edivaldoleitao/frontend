import { apiRequest } from "../../../service/api";
import type { UserSpecification } from "../types/type";


export async function createUserSpecificationService(data: UserSpecification): Promise<any> {
    return await apiRequest("/users/specification/create/", {
        method: "POST",
        data: JSON.stringify(data),
    });
}
