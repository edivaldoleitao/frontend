import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import { Labels, AlertMessage } from "./index.ts";
import { ChevronLeft } from "lucide-react";
import { useChange } from "../hooks/useChangePassword.ts";

function ChangePassword() {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    setError,
    type,
    handleChange,
  } = useChange();

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
          <form onSubmit={handleChange}>
            <div className="form">
              <h1>Recuperar Senha</h1>
              <div className="p-8">
                <div className="flex flex-col justify-center items-center ">
                  <div className="w-[80%]">
                    <Labels
                      variant="Password"
                      name="Senha"
                      id="password"
                      value={password}
                      placeholder="**********"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Labels
                      variant="Password"
                      name="Confirmar Senha"
                      id="confirmPassword"
                      value={confirmPassword}
                      placeholder="**********"
                      onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ChangePassword;
