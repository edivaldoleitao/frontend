import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatInterface from "../../../components/common/chat";
import { useAuth } from "../../../context/AuthContext.tsx";

export default function Initial() {
  const [inputMessage, setInputMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col">
      <header className="flex justify-end items-center p-6">
        <div className="flex gap-3">
          {user ? (
            <span
              className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-full shadow-md border border-blue-100
               hover:text-blue-600 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-default"
            >
              Olá, {user.name}!
            </span>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="bg-white cursor-pointer text-blue-700 hover:text-blue-600 font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-blue-100"
              >
                Entrar
              </button>
              <button
                onClick={() => navigate("/CreateUser")}
                className="bg-blue-700 cursor-pointer hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Cadastre-se
              </button>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <ChatInterface
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
        />
      </main>
    </div>
  );
}
