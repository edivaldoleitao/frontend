import "./login.css";
import { useState } from "react";
import { blueLogo, whiteLogo } from "./index.ts";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  function navigateToPage(page: string) {
    navigate(page);
  }

  return (
    <div className="backGround">
      <div className="logoSide">
        <div>
          <img src={blueLogo} className="blueLogo"></img>
          <img src={whiteLogo} className="whiteLogo"></img>
          <h1 className="textLogo">
            Seu aliado na seleção de peças e na economia do computador perfeito.
          </h1>
        </div>
      </div>
      <div className="formSide">
        <div className="loginForm">
          <form>
            <h1 className="textLogin">Login</h1>
            <div className="inputContainer">
              <label className="inputName" htmlFor="email">
                Email
              </label>
              <input className="inputBox" type="text" id="email"></input>
            </div>
            <div className="inputContainer">
              <label className="inputName" htmlFor="password">
                Senha
              </label>
              <div className="inputBox">
                <input
                  type={visible ? "text" : "password"}
                  id="password"
                  className="passwordBox"
                ></input>
                <button
                  type="button"
                  onClick={() => setVisible((v) => !v)}
                  className="text-[#266FE8]"
                >
                  {visible ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <div className="forgotPassword">
              <button
                className="sideBtn"
                onClick={() => navigateToPage("/PasswordRecover")}
              >
                Esqueceu a senha?
              </button>
            </div>
            <button className="btnLogin">Entrar</button>
            <br />
            <button
              className="sideBtn"
              onClick={() => navigateToPage("/CreateAccount")}
            >
              Ou crie sua conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
