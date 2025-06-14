import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import Label from "../../../components/common/Labels/Label.tsx";

function Login() {
  const navigate = useNavigate();

  function navigateToPage(page: string) {
    navigate(page);
  }

  return (
    <div className="loginForm">
      <form>
        <h1 className="textLogin">Login</h1>

        <Label variant="inputText" name="Email" id="email"></Label>
        <Label variant="Password" name="Senha" id="password"></Label>
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
