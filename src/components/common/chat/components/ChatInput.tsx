import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  autenticated?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false, autenticated = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (!autenticated) {
        navigate("/login");
        return;
      }
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <div className="sticky bottom-0 p-4  z-10">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-center gap-3 w-full bg-white border border-gray-300 rounded-2xl shadow-md px-4 py-3 transition-all duration-200 focus-within:ring-2 focus-within:ring-violet-500">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={autenticated ? "Digite sua mensagem..." : "Faça login para continuar"}
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-gray-800 placeholder-gray-400 min-h-[24px] max-h-[120px] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white rounded-full p-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:scale-105"
          >
            <Send size={18} className="transition-transform duration-200" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
