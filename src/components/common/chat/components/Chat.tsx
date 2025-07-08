import React, { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import useChatFlow from '../hooks/useChatFlow.ts';
import { removeOptionsFromLastBotMessage } from '../hooks/useHandleOptionClick.ts';
import { useAuth } from '../../../../context/AuthContext.tsx';
import { useCreateUserSpecification } from '../../../../features/upgrade/hooks/useCreateUserSpecification.ts';
import type { SpecsForm } from '../../../../features/upgrade/components/SpecsFormComponent.tsx';
import type { UserSpecification } from '../../../../features/upgrade/types/type.ts';
import type { Message } from '../../../../types/types.ts';

interface ChatProps {
  initialMessages?: Message[];
  isUpgrade?: boolean;
}

const Chat: React.FC<ChatProps> = ({ initialMessages = [], isUpgrade = false }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, _] = useState(false);
  const [showSpecsForm, setShowSpecsForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const {
    payload,
    setPayload,
    lastBotKey,
    setLastBotKey,
    botFollowUps
  } = useChatFlow();

  const { createSpecification, loading: creating } = useCreateUserSpecification();

  const [specsForm, setSpecsForm] = useState<SpecsForm>({
    placaMae: '', processador: '', memoriaRAM: '', placaVideo: '', ssd: '', hd: '', fonte: '', cooler: '',
    hasPlacaVideo: true, hasSSD: true, hasHD: true
  });

  useEffect(() => setMessages(initialMessages), [initialMessages]);
  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, showSpecsForm]);

  const addMessage = (msg: Message) => setMessages(prev => [...prev, msg]);

  const handleSendMessage = async (messageText: string) => {
    const now = new Date();
    const userMessage: Message = { id: now.getTime().toString(), text: messageText, isUser: true, timestamp: now };
    addMessage(userMessage);

    if (isUpgrade && ["Para meu computador", "Para outro computador"].includes(messageText)) {
      setTimeout(() => setShowSpecsForm(true), 600);
      return;
    }

    if (lastBotKey === 'Jogos') {
      setPayload((prev: typeof payload) => ({ ...prev, jogos: messageText }));
      setTimeout(() => {
        addMessage({ id: Date.now().toString(), text: "Agora, me diz: quanto você pretende investir?", isUser: false, timestamp: new Date() });
        setLastBotKey('investimento');
      }, 1000);
      return;
    }

    if (lastBotKey === 'investimento') {
      setPayload((prev: typeof payload) => {
        const updated: typeof payload = { ...prev, investimento: messageText };
        console.log("\u{1F4E6} Respostas finais:", JSON.stringify(updated, null, 2));
        return updated;
      });
      setLastBotKey(null);
      return;
    }

    const followUp = botFollowUps[messageText];
    if (followUp) {
      const newPayload = { ...payload };
      if (messageText === 'Computador') newPayload.tipo = messageText;
      if (["PC", "Notebook"].includes(messageText)) newPayload.modelo = messageText;
      if (["Trabalho", "Jogos", "Casual"].includes(messageText)) newPayload.uso = messageText;
      setPayload(newPayload);

      setTimeout(() => {
        if (["Trabalho", "Casual"].includes(messageText)) {
          addMessage({ id: Date.now().toString(), text: "Agora, me diz: quanto você pretende investir?", isUser: false, timestamp: new Date() });
          setLastBotKey('investimento');
        } else {
          addMessage({ id: Date.now().toString(), text: followUp.text, isUser: false, timestamp: new Date(), options: followUp.options });
          if (!followUp.options) setLastBotKey(messageText);
        }
      }, 1000);
    } else {
      setTimeout(() => {
        addMessage({ id: Date.now().toString(), text: "Agora, me diz: quanto você pretende investir?", isUser: false, timestamp: new Date() });
        setLastBotKey('investimento');
      }, 1000);
    }
  };

  const handleOptionClick = (option: string) => {
    setMessages((prev) => removeOptionsFromLastBotMessage(prev));
    handleSendMessage(option);
  };

  const handleSpecsChange = (field: keyof SpecsForm, value: string | boolean) => {
    setSpecsForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecsSubmit = async (data: UserSpecification) => {
    try {
      await createSpecification(data);
      setShowSpecsForm(false);
      setTimeout(() => {
        addMessage({ id: Date.now().toString(), text: "Ótimo, já coletei suas informações.", isUser: false, timestamp: new Date() });
        addMessage({ id: (Date.now() + 1).toString(), text: "Beleza! Me conta, qual o motivo do upgrade?\nO que você quer melhorar na sua máquina?", isUser: false, timestamp: new Date() });
      }, 1000);
    } catch {
      addMessage({ id: Date.now().toString(), text: "Ocorreu um erro ao enviar suas especificações. Tente novamente.", isUser: false, timestamp: new Date() });
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
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

      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping || showSpecsForm || creating} />
    </div>
  );
};

export default Chat;
