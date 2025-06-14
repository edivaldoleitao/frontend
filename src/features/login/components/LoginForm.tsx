import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  function navigateToPage(page: string) {
    navigate(page);
  }

  return (
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
        <button className="btnDefaultAuth">Entrar</button>
        <br />
        <button
          className="sideBtn"
          onClick={() => navigateToPage("/CreateAccount")}
        >
          Ou crie sua conta
        </button>
      </form>
    </div>
  );
}

export default Login;
