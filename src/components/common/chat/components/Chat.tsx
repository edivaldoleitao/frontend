import React from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import bot from "../../../../assets/trackbot.png";
import type { Message } from '../../../../types/types';
import useChatLogic from '../hooks/useChatLogic';
import { RefreshCw } from 'lucide-react';

interface ChatProps {
  initialMessages?: Message[];
  isUpgrade?: boolean;
  onRestart: () => void;
}

const Chat: React.FC<ChatProps> = ({ initialMessages = [], isUpgrade = false, onRestart }) => {
  const {
    messages,
    isInputDisabled,
    isTyping,
    showSpecsForm,
    specsForm,
    user,
    messagesEndRef,
    conversationEnded,
    handleSendMessage,
    handleOptionClick,
    handleSpecsChange,
    handleSpecsSubmit,
    restartConversation,
  } = useChatLogic(initialMessages, isUpgrade);

  const handleRestartClick = () => {
    restartConversation();
    onRestart();
  };

  return (
    <div className="flex flex-col h-full w-full">
      {!user && (
        <div className="flex flex-col items-center mt-6">
          <img src={bot} alt="TrackBot" />
          <h2 className="text-2xl font-bold text-blue-600">Olá, eu sou o TrackBot</h2>
          <p className="text-blue-600">Consultor de compras</p>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <MessageList
            messages={messages}
            showSpecsForm={showSpecsForm}
            isTyping={isTyping}
            isUpgrade={isUpgrade}
            userId={user?.id}
            specsForm={specsForm}
            onSpecsChange={handleSpecsChange}
            onSpecsSubmit={handleSpecsSubmit}
            onOptionClick={handleOptionClick}
          />
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div>
        {conversationEnded ? (
          <div className="flex justify-center">
            <button onClick={handleRestartClick}
              className="flex items-center gap-2 bg-[#6A4CC3] hover:bg-[#5536A7] text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-200 hover:scale-105"
            >
              <RefreshCw size={18} />
              Preciso de outro produto
            </button>
          </div>
        ) : (
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isInputDisabled}
            autenticated={!!user}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
