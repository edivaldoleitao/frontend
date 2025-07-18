import { useState } from "react";
import { chatBot } from "../services/chatBotService"; 
import type { AgentResponse, ChatBotRequest } from "../types/type"

export function useChatBot() {
  const [data, setData] = useState<AgentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async (params: ChatBotRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await chatBot(params);
      setData(response);
      return response;
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Erro desconhecido");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    sendRequest,
  };
}
