import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin.ts";
import Label from "../../../components/common/labels/Label.tsx";

//TODO: Mensagem de Erro

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
  } = useLogin();

  const navigate = useNavigate();

  function navigateToPage(page: string) {
    navigate(page);
  }

  return (
    <div className="loginForm">
      <form onSubmit={handleLogin}>
        <h1 className="textLogin">Login</h1>
        <Label
          variant="inputText"
          name="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Label>
        <Label
          variant="Password"
          name="Senha"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Label>
        {error && <p className="errorMessage">{error}</p>}
        <div className="forgotPassword">
          <button
            typeof="button"
            className="sideBtn"
            onClick={() => navigateToPage("/PasswordRecover")}
          >
            Esqueceu a senha?
          </button>
        </div>
        <button type="submit" className="btnDefaultAuth">
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
        <br />
        <button
          typeof="button"
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
