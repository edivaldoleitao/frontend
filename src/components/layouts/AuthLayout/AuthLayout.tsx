import "./AuthLayout.css";
import { blueLogo, whiteLogo } from "./index.ts";
import type { AuthLayoutProps } from "./index";
import Login from "../../../features/login/components/LoginForm.tsx";
import Register from "../../../features/register/components/RegisterForm.tsx";

function AuthLayout({ setLogin }: AuthLayoutProps) {
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
      <div className="formSide">{setLogin ? <Login /> : <Register />}</div>
    </div>
  );
}

export default AuthLayout;
