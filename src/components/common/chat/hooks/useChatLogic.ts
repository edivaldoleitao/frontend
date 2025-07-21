import { useEffect, useRef, useState } from 'react';
import useChatFlow from './useChatFlow';
import { useAuth } from '../../../../context/AuthContext.tsx';
import { useChatBot } from '../../../../features/initial/hooks/useChatBot';
import { useUpgradeBot } from '../../../../features/initial/hooks/useUpgradeBot';
import { useCreateUserSpecification } from '../../../../features/upgrade/hooks/useCreateUserSpecification';
import { getUserSpecificationService } from '../../../../features/upgrade/services/getUserSpecificationService';
import type { SpecsForm } from '../../../../features/upgrade/components/SpecsFormComponent';
import type { UserSpecification } from '../../../../features/upgrade/types/type';
import { removeOptionsFromLastBotMessage } from './useHandleOptionClick';
import type { Message } from '../../../../types/types';

export default function useChatLogic(initialMessages: Message[], isUpgrade: boolean) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [isTyping, _] = useState(false);
    const [showSpecsForm, setShowSpecsForm] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { user } = useAuth();
    const { createSpecification, loading: creating } = useCreateUserSpecification();
    const { data: recommendation, loading: fetching, sendRequest: fetchRecommendation } = useChatBot();
    const { data: upgradeResponse, loading: loadingUpgrade, sendRequest: sendUpgradeRequest } = useUpgradeBot();

    const {
        payload,
        setPayload,
        lastBotKey,
        setLastBotKey,
        botFollowUps
    } = useChatFlow();

    const [specsForm, setSpecsForm] = useState<SpecsForm>({
        placaMae: '',
        processador: '',
        memoriaRAM: '',
        placaVideo: '',
        ssd: '',
        hd: '',
        fonte: '',
        cooler: '',
        hasPlacaVideo: true,
        hasSSD: true,
        hasHD: true
    });

    useEffect(() => {
        const loadExistingSpecs = async () => {
            if (!user?.id) return;

            const existing = await getUserSpecificationService(user.id);
            if (existing) {
                setSpecsForm({
                    placaMae: existing.motherboard ?? '',
                    processador: existing.cpu ?? '',
                    memoriaRAM: existing.ram ?? '',
                    placaVideo: existing.gpu ?? '',
                    ssd: existing.storage?.includes("SSD") ? existing.storage : '',
                    hd: existing.storage?.includes("HD") ? existing.storage : '',
                    fonte: existing.psu ?? '',
                    cooler: existing.cooler ?? '',
                    hasPlacaVideo: !!existing.gpu,
                    hasSSD: existing.storage?.includes("SSD") ?? true,
                    hasHD: existing.storage?.includes("HD") ?? true,
                });
            }
        };

        loadExistingSpecs();
    }, [user]);

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

            if (!isUpgrade) {
                setTimeout(() => {
                    addMessage({ id: Date.now().toString(), text: "Agora, me diz: quanto você pretende investir?", isUser: false, timestamp: new Date() });
                    setLastBotKey('investimento');
                }, 1000);
            } else {
                setLastBotKey(null);
            }

            return;
        }


        if (lastBotKey === 'investimento') {
            const updated = { ...payload, investimento: messageText };
            setPayload(updated);
            setLastBotKey(null);

            if (!isUpgrade) {
                const requestBody = {
                    categoria: updated.tipo ?? '',
                    uso: updated.uso ?? '',
                    pergunta_basada_no_uso: updated.jogos ?? '',
                    preco: parseInt(updated.investimento || '0'),
                    descricao_adicional: updated.modelo ?? '',
                };

                const result = await fetchRecommendation(requestBody);

                addMessage({
                    id: Date.now().toString(),
                    text: result?.recomendacao ?? result?.error ?? "Não encontrei produtos compatíveis com sua necessidade.",
                    isUser: false,
                    timestamp: new Date(),
                });
                if (result?.produtos?.length) {
                    result.produtos.forEach((produto) => {
                        addMessage({
                            id: (Date.now() + Math.random()).toString(),
                            text: produto.name,
                            isUser: false,
                            timestamp: new Date(),
                            image: produto.image_url,
                            link: produto.url_product,
                        });
                    });
                }

                return;
            }
        }

        const followUp = botFollowUps[messageText];
        if (followUp) {
            const newPayload = { ...payload };

            if (["Computador", "Periférico", "Componentes"].includes(messageText)) {
                newPayload.tipo = messageText;
            }
            if (["PC", "Notebook"].includes(messageText)) {
                newPayload.modelo = messageText;
            }
            if (["Trabalho", "Jogos", "Casual"].includes(messageText)) {
                newPayload.uso = messageText;
            }
            if (["Processador", "Memória RAM", "Placa de vídeo", "Fonte", "Teclado", "Mouse", "Headset", "Monitor"].includes(messageText)) {
                newPayload.subcategoria = messageText;
                if (messageText === "Placa de vídeo") newPayload.uso = "Jogar";
            }

            if (followUp.nextKey === "jogos") setLastBotKey("Jogos");
            else if (followUp.nextKey === "investimento") setLastBotKey("investimento");
            else setLastBotKey(messageText);

            setPayload(newPayload);
            setTimeout(() => {
                addMessage({
                    id: Date.now().toString(),
                    text: followUp.text,
                    isUser: false,
                    timestamp: new Date(),
                    options: followUp.options,
                });
            }, 1000);
            return;
        } else {
            setTimeout(() => {
                addMessage({ id: Date.now().toString(), text: "Agora, me diz: quanto você pretende investir?", isUser: false, timestamp: new Date() });
                setLastBotKey('investimento');
            }, 1000);
        }

        if (isUpgrade && messages.some(m => m.text.includes("motivo do upgrade"))) {
            await handleUpgradeReason(messageText);
        }
    };

    const handleOptionClick = (option: string) => {
        setMessages(prev => removeOptionsFromLastBotMessage(prev));
        handleSendMessage(option);
    };

    const handleSpecsChange = (field: keyof SpecsForm, value: string | boolean) => {
        setSpecsForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSpecsSubmit = async (data: UserSpecification) => {
        if (!user) {
            addMessage({ id: Date.now().toString(), text: "Você precisa estar logado para enviar suas especificações.", isUser: false, timestamp: new Date() });
            return;
        }

        const payload = {
            user_id: user.id,
            cpu: data.cpu,
            ram: data.ram,
            motherboard: data.motherboard,
            cooler: data.cooler,
            gpu: data.gpu || "",
            storage: data.storage || "",
            psu: data.psu || "",
        };

        try {
            await createSpecification(payload);
            setShowSpecsForm(false);
            setTimeout(() => {
                addMessage({ id: Date.now().toString(), text: "Ótimo, já coletei suas informações.", isUser: false, timestamp: new Date() });
                addMessage({ id: (Date.now() + 1).toString(), text: "Beleza! Me conta, qual o motivo do upgrade?\nO que você quer melhorar na sua máquina?", isUser: false, timestamp: new Date() });
            }, 1000);
        } catch {
            addMessage({ id: Date.now().toString(), text: "Ocorreu um erro ao enviar suas especificações. Tente novamente.", isUser: false, timestamp: new Date() });
        }
    };

    const handleUpgradeReason = async (reason: string) => {
        const setup = {
            placa_mae: specsForm.placaMae,
            processador: specsForm.processador,
            ram: specsForm.memoriaRAM,
            placa_video: specsForm.placaVideo,
            ssd: specsForm.ssd,
            hd: specsForm.hd,
            fonte: specsForm.fonte,
            cooler: specsForm.cooler,
        };

        const requestPayload = {
            setup,
            descricao: reason,
        };

        console.log("Enviando requisição de upgrade:", requestPayload);

        const result = await sendUpgradeRequest(requestPayload);

        addMessage({
            id: Date.now().toString(),
            text: result?.resposta ?? result?.error ?? "Não encontrei produtos compatíveis com seu upgrade.",
            isUser: false,
            timestamp: new Date(),
        });

        if (result?.produtos_encontrados?.length) {
            result.produtos_encontrados.forEach((produto) => {
                addMessage({
                    id: (Date.now() + Math.random()).toString(),
                    text: produto.name,
                    isUser: false,
                    timestamp: new Date(),
                    image: produto.image_url,
                    link: produto.url_product,
                });
            });
        }
    };


    return {
        messages,
        isTyping: isTyping || fetching || loadingUpgrade,
        showSpecsForm,
        specsForm,
        user,
        messagesEndRef,
        creating,
        handleSendMessage,
        handleOptionClick,
        handleSpecsChange,
        handleSpecsSubmit
    };
}
