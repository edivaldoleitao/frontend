import { useState } from "react";

const useChatFlow = () => {
  const [payload, setPayload] = useState<any>({});
  const [lastBotKey, setLastBotKey] = useState<string | null>(null);

  const botFollowUps: Record<string, { text: string; options?: string[]; nextKey?: string }> = {
    "Computador": {
      text: "Qual opção você está procurando?",
      options: ["PC", "Notebook"],
      nextKey: "modelo",
    },
    "PC": {
      text: "Qual o seu uso atual para o computador?",
      options: ["Trabalho", "Jogos", "Casual"],
      nextKey: "uso",
    },
    "Notebook": {
      text: "Qual o seu uso atual para o computador?",
      options: ["Trabalho", "Jogos", "Casual"],
      nextKey: "uso",
    },
    "Periférico": {
      text: "Legal! Está procurando qual tipo de periférico?",
      options: ["Teclado", "Mouse", "Headset", "Monitor"],
      nextKey: "subcategoria",
    },
    "Componentes": {
      text: "Show! Está procurando qual componente?",
      options: ["Processador", "Memória RAM", "Placa de vídeo", "Fonte"],
      nextKey: "subcategoria",
    },
    "Placa de vídeo": {
      text: "Legal! Quais jogos você deseja jogar?",
      nextKey: "jogos",
    },
    "Jogos": {
      text: "Quais jogos e/ou tipos de jogos você deseja jogar?",
      nextKey: "jogos",
    },
    "Trabalho": {
      text: "Beleza. Me diz: quanto você pretende investir?",
      nextKey: "investimento",
    },
    "Casual": {
      text: "Tranquilo. Agora me diz: quanto você pretende investir?",
      nextKey: "investimento",
    },
  };

  return {
    payload,
    setPayload,
    lastBotKey,
    setLastBotKey,
    botFollowUps,
  };
};

export default useChatFlow;
