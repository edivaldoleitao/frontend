import { useState } from "react";

const useChatFlow = () => {
  const [payload, setPayload] = useState<any>({});
  const [lastBotKey, setLastBotKey] = useState<string | null>(null);

  const botFollowUps: Record<string, { text: string; options?: string[] }> = {
    "Computador": {
      text: "Qual opção você está procurando?",
      options: ["PC", "Notebook"],
    },
    "PC": {
      text: "Qual o seu uso atual para o computador?",
      options: ["Trabalho", "Jogos", "Casual"],
    },
    "Notebook": {
      text: "Qual o seu uso atual para o computador?",
      options: ["Trabalho", "Jogos", "Casual"],
    },
    "Jogos": {
      text: "Quais jogos e/ou tipos de jogos você deseja jogar?",
    },
    "Periférico": {
      text: "Legal! Está procurando qual tipo de periférico?",
      options: ["Teclado", "Mouse", "Headset", "Monitor"],
    },
    "Componentes": {
      text: "Show! Está procurando qual componente?",
      options: ["Processador", "Memória RAM", "Placa de vídeo", "Fonte"],
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
