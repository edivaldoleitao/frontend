import { apiRequest } from "../../../service/api";
import type { AgentResponse, ChatBotRequest, UpgradeRequest, UpgradeResponse } from "../types/type";


export async function chatBot(params: ChatBotRequest) : Promise<AgentResponse> {
    return await apiRequest<AgentResponse>("/chatbot/use/", {
        method: "POST",
        data: params
    });
}

export async function upgradeBot(params: UpgradeRequest) : Promise<UpgradeResponse> {
    return await apiRequest<UpgradeResponse>("/chatbot/upgrade/", {
        method: "POST",
        data: params
    });
}