import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCriarUsuario } from "../hooks/useCriarUsuario";
import "./RegisterForm.css";
import { CategoriasSelector } from "../../../components/common/select/CategoriasSelector";
import { AlertMessage } from "../../../components/common/alert/AlertMessage";
import Label from "../../../components/common/Labels/Label";

function Register() {
  const navigate = useNavigate();
  const { criarUsuario, loading } = useCriarUsuario();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"warning" | "error">("warning");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlertType("warning");
      setAlertMessage("As senhas precisam ser iguais");
      return;
    }

    if (!name || !email || !password || selectedCategories.length === 0) {
      setAlertType("warning");
      setAlertMessage("Preencha todos os campos necessários!");
      return;
    }

    const response = await criarUsuario({
      name,
      email,
      password,
      categories: selectedCategories,
    });

    if (response) {
      navigate("/login");
    } else {
      setAlertType("error");
      setAlertMessage("Formato do email está incorreto!");
    }
  };

  return (
    <div className="registerForm">
      <form onSubmit={handleSubmit}>
        {alertMessage && (
          <AlertMessage
            type={alertType}
            message={alertMessage}
            onClose={() => setAlertMessage("")}
          />
        )}
        <h1 className="textRegister">Cadastro</h1>

        <Label
          variant="inputText"
          name="Nome"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label
          variant="inputText"
          name="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label
          variant="Password"
          name="Senha"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Label
          variant="Password"
          name="Confirmar Senha"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <CategoriasSelector
          label="Categorias Favoritas"
          options={["gamer", "home_office", "estudo"]}
          selected={selectedCategories}
          setSelected={setSelectedCategories}
        />

        <button type="submit" className="btnCadastrar" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <br />

        <button
          type="button"
          className="sideBtn text-lg font-bold"
          onClick={() => navigate("/login")}
        >
          Já possui login?
        </button>
      </form>
    </div>
  );
}

export default Register;
