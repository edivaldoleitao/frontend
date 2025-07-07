import { whiteLogo } from "../../login/components";

import Label from "../../../components/common/Labels/Label";
import { useState } from "react";
import {
  AlertMessage,
  type AlertMessageType,
} from "../../../components/common/alert/AlertMessage";
import { atualizarSenha } from "../services/updatePasswordService";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePassword() {
  const { userId } = useParams();

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertMessageType>("success");

  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlertType("warning");
      setAlertMessage("As senhas precisam ser iguais");
      return;
    }

    if (!userId) return;

    try {
      await atualizarSenha(userId, password, confirmPassword);

      setAlertType("success");
      setAlertMessage("Senha atualizada! Você já pode fazer login com a nova senha.");
    } catch (error) {
      setAlertType("error");
      setAlertMessage("Ocorreu um erro ao Atualizar senha!");
    }
  };

  const navigate = useNavigate();
  function navigateToPage(page: string) {
    navigate(page);
  }

  return (
    <>
      {alertMessage && (
        <AlertMessage
          type={alertType}
          message={alertMessage}
          onClose={() => setAlertMessage("")}
        />
      )}
      <header className="bg-blue-600 text-white p-6 relative z-50 hover:cursor-pointer" onClick={() => navigateToPage("/")}>
        <div className="flex items-center space-x-2">
          <img src={whiteLogo} alt="Logo Branco" className="h-20 w-auto" />
        </div>
      </header>
      <div className="recoverPasswordForm w-1/4 m-auto py-16  ">
        <form onSubmit={handleSubmit}>
          <h1 className="text-5xl  font-bold mb-6 text-center">
            Redefinir senha
          </h1>

          <Label
            variant="Password"
            name="Nova Senha"
            id="newPassword"
            value={password}
            placeholder="**********"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Label
            variant="Password"
            name="Confirmar Senha"
            id="confirmPassword"
            value={confirmPassword}
            placeholder="**********"
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <button className="bg-blue-700  w-1/3 cursor-pointer hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdatePassword;
