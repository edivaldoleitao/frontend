import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.tsx";
import Chat from "../../../components/common/chat/components/Chat.tsx";
import { useEffect, useState } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  options?: string[];
}

const initialChatMessages: Message[] = [
  {
    id: "1",
    text: "Olá, sou o TrackBot, seu assistente virtual responsável por te ajudar a encontrar o produto ideal para o seu uso. Para isso, me responde algumas perguntas rápidas:",
    isUser: false,
    timestamp: new Date(),
  },
  {
    id: "2",
    text: "Que tipo de produto você está procurando?",
    isUser: false,
    timestamp: new Date(),
    options: ["Periférico", "Computador", "Componentes"],
  },
];

export default function Initial() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (user) {
      const now = new Date();
      setMessages(initialChatMessages.map(m => ({ ...m, timestamp: now })));
    }
  }, [user]);

  const handleRestart = () => {
    const now = new Date();
    setMessages(initialChatMessages.map(m => ({ ...m, timestamp: now })));
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="flex justify-end items-center p-6">
        <div className="flex gap-3">
          {user ? (
            <span className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-full shadow-md border border-blue-100 cursor-default">
              Olá, {user.name}!
            </span>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-full shadow-md border border-blue-100 hover:text-blue-600 hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Entrar
              </button>
              <button
                onClick={() => navigate("/CreateUser")}
                className="bg-blue-700 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Cadastre-se
              </button>
            </>
          )}
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Chat initialMessages={messages} onRestart={handleRestart} />
      </main>
    </div>
  );
}
