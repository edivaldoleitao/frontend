import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../../../components/common/chat/components/Chat.tsx";
import { useAuth } from "../../../context/AuthContext.tsx";
import type { Message } from "../../../types/types.ts";

const UpgradeChat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id;

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!userId) {
      navigate("/", { replace: true });
    } else {
      const now = new Date();
      setMessages([
        {
          id: "1",
          text:
            "Olá, sou o TrackBot, seu assistente virtual responsável por te ajudar com o upgrade da sua máquina. Para isso, preciso de algumas informações:",
          isUser: false,
          timestamp: now,
        },
        {
          id: "2",
          text: "Você quer o upgrade...",
          isUser: false,
          timestamp: now,
          options: ["Para meu computador", "Para outro computador"],
        },
      ]);
    }
  }, [userId, navigate]);

  return (
    <div className="flex-1 flex items-center justify-center p-4 h-screen">
      <Chat initialMessages={messages}  isUpgrade />
    </div>
  );
};

export default UpgradeChat;
