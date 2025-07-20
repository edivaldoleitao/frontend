// src/features/confirmAccount/hooks/useConfirmAccount.ts

import { useEffect, useState } from "react";
import { requestConfirmAccount } from "../services/confirmAccountService";
import { useNavigate, useParams } from "react-router-dom";

export const useConfirmAccount = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const confirm = async () => {
      if (!id) {
        setMessage("Token de confirmação inválido.");
        setIsSuccess(false);
        setLoading(false);
        return;
      }

      try {
        const response = await requestConfirmAccount(id);
        setMessage(response.message);
        setIsSuccess(response.status === "success");
        if (response.status === "success") {
          setCountdown(5);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage("Erro ao confirmar a conta.");
        }
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    confirm();
  }, [id]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isSuccess) {
      navigate("/login");
    }
  }, [countdown, isSuccess, navigate]);

  return { loading, message, isSuccess, countdown };
};