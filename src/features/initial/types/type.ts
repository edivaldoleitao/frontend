export interface ChatBotRequest {
  categoria: string;
  uso: string;
  pergunta_basada_no_uso: string;
  preco: number;
  descricao_adicional: string;
}

export interface UpgradeRequest {
  setup: {
    placa_mae: string;
    processador: string;
    ram: string;
    placa_video: string;
    ssd: string;
    hd: string;
    fonte: string;
    cooler: string;
  };
  descricao: string;
}

export interface SpecSearch {
  model_name: string;
  columns: string[];
  search_values: string[];
}

export interface SpecResult {
  searches: SpecSearch[];
}

export interface ProductResult {
  id?: number;
  nome?: string;
  preco?: number;
  link?: string;
  imagem?: string;
  loja?: string;
  especificacoes?: Record<string, string>;
  [key: string]: any;
}

export interface AgentResponse {
  specs?: SpecResult;
  produtos?: ProductResult[];
  recomendacao?: string;
  error?: string;
}

export interface UpgradeResponse {
  upgrade_specs?: SpecResult;
  produtos_encontrados?: ProductResult[];
  resposta?: string;
  error?: string;
}
