import { useNavigate } from "react-router-dom";
import "./RecoverPassword.css";
import { Labels, AlertMessage } from "./index.ts";
import { ChevronLeft } from "lucide-react";
import { useRecover } from "../hooks/useRecoverPassword.ts";

function RecoverPassword() {
  const { email, setEmail, loading, error, setError, type, handleRecover } =
    useRecover();

  const navigate = useNavigate();

  function navigateToPage(page: string) {
    navigate(page);
  }

  return (
    <div className="background">
      <div className="pageContent">
        <div className="leftSide">
          <ChevronLeft className="arrow" onClick={() => navigateToPage("/")} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="w-[60%] pt-10">
            {error && (
              <AlertMessage
                type={type}
                message={error}
                onClose={() => setError("")}
              />
            )}
          </div>
          <form onSubmit={handleRecover}>
            <div className="form">
              <h1>Solicitar Recuperação de Senha</h1>
              <div className="p-8">
                <div className="flex flex-col justify-center items-center ">
                  <h2 className="w-[80%]">
                    Insira o email usado no cadastro da sua conta, enviaremos um
                    link para redefinir sua senha.
                  </h2>
                  <div className="w-[60%]">
                    <Labels
                      variant="inputText"
                      name="Email"
                      id="name"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="btnDefault">
                      {loading ? "Enviando..." : "Enviar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="rightSide"></div>
      </div>
    </div>
  );
}

export default RecoverPassword;
