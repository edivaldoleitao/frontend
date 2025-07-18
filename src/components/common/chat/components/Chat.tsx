import React, { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import bot from "../../../../assets/trackbot.png";
import type { Message } from '../../../../types/types';
import useChatLogic from '../hooks/useChatLogic';

interface ChatProps {
  initialMessages?: Message[];
  isUpgrade?: boolean;
}

const Chat: React.FC<ChatProps> = ({ initialMessages = [], isUpgrade = false }) => {
  const {
    messages,
    isTyping,
    showSpecsForm,
    specsForm,
    user,
    messagesEndRef,
    creating,
    handleSendMessage,
    handleOptionClick,
    handleSpecsChange,
    handleSpecsSubmit
  } = useChatLogic(initialMessages, isUpgrade);

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

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isTyping || showSpecsForm || creating}
        autenticated={!!user}
      />
    </div>
  );
};

export default Chat;
