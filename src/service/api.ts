import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_DJANGO_API;

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${endpoint}`,
      method: options.method || "GET",
      data: options.data,
      params: options.params,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.message || error.response.statusText
      );
    } else if (error.request) {
      throw new Error("Nenhuma resposta do servidor");
    } else {
      throw new Error(error.message);
    }
  }
}
