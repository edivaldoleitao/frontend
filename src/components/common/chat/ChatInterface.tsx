import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import roboBot from "../../../assets/trackbot.png";

interface ChatInterfaceProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ inputMessage, setInputMessage }) => {
  const navigate = useNavigate();
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      console.log('Mensagem enviada:', inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        setShowLoginAlert(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000); // redireciona após 2 segundos
        return;
      }

      handleSendMessage();
    }
  };

  return (
    <div className="w-full px-6 mx-auto">
      {showLoginAlert && (
        <div className="bg-yellow-500 text-white font-medium px-6 py-2 rounded-full flex items-center justify-between shadow-md mb-4">
          É necessário fazer login para prosseguir
          <button onClick={() => setShowLoginAlert(false)} className="ml-4 text-white text-xl leading-none">&times;</button>
        </div>
      )}

      <div className="flex flex-col items-center mb-8">
        <img src={roboBot} alt="TrackBot" />
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            Olá, eu sou o TrackBot, o seu
          </h2>
          <h3 className="text-2xl font-bold text-blue-600">
            consultor de compras
          </h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-3 border border-gray-100 w-full">
        <div className="flex gap-2 items-center">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Para começar faça login ou crie sua conta"
            className="flex-1 border-gray-200 focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-xl px-2 py-1.5 text-gray-700 placeholder-gray-400 text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 p-0 flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
