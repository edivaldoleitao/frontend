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
    "Jogos": {
      text: "Quais jogos e/ou tipos de jogos você deseja jogar?",
      nextKey: "detalhesUso",
    },
    "Trabalho": {
      text: "Ótimo! Como você pretende usar o computador no seu trabalho?",
      nextKey: "detalhesUso",
    },
    "Casual": {
      text: "Massa, me diz: como você quer usar o computador?",
      nextKey: "detalhesUso",
    },
    "Periférico": {
      text: "Legal! Está procurando qual tipo de periférico?",
      options: ["Teclado", "Mouse", "Monitor"],
      nextKey: "subcategoria",
    },
    "Teclado": {
      text: "Certo. Existe alguma característica que você busca? (Ex: mecânico, sem fio, com RGB)",
      nextKey: "detalhesUso",
    },
    "Mouse": {
      text: "Certo. Existe alguma característica que você busca? (Ex: sem fio, para jogos FPS, ergonômico)",
      nextKey: "detalhesUso",
    },
    "Monitor": {
      text: "Certo. Existe alguma característica que você busca? (Ex: tamanho, resolução, taxa de atualização)",
      nextKey: "detalhesUso",
    },
    "Componentes": {
      text: "Show! Está procurando qual componente?",
      options: ["Processador", "Memória RAM", "Placa de vídeo", "Fonte", "HD/SSD", "Placa-mãe"],
      nextKey: "subcategoria",
    },
    "Placa de vídeo": {
      text: "Entendido. Para te ajudar melhor, quais jogos ou programas pesados você pretende usar?",
      nextKey: "detalhesUso",
    },
    "Processador": {
      text: "Entendido. Para te ajudar melhor, quais jogos ou programas pesados você pretende usar?",
      nextKey: "detalhesUso",
    },
    "Memória RAM": {
      text: "Entendido. Para te ajudar melhor, quais jogos ou programas pesados você pretende usar?",
      nextKey: "detalhesUso",
    },
    "Fonte": {
      text: "Entendido. Para te ajudar melhor, quais jogos ou programas pesados você pretende usar?",
      nextKey: "detalhesUso",
    },
    "HD/SSD": {
      text: "Entendido. Para te ajudar melhor, quais jogos ou programas pesados você pretende usar?",
      nextKey: "detalhesUso",
    },
    "Placa-mãe": {
      text: "Entendido. Para te ajudar melhor, quais jogos ou programas pesados você pretende usar?",
      nextKey: "detalhesUso",
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
