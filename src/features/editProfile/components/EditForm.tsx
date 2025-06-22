import "./EditForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Labels } from "./index.ts";
import { ChevronLeft } from "lucide-react";
import { useEdit } from "../hooks/useEdit.ts";
import { CategoriasSelector } from "../../../components/common/select/CategoriasSelector";

function Edit() {
  const { error, setError, isLoading, handleEdit } = useEdit();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const navigate = useNavigate();

  function navigateToPage(page: string) {
    navigate(page);
  }

  return (
    <div className="background">
      <Navbar />
      <div className="pageContent">
        <div className="leftSide">
          <ChevronLeft
            className="arrow"
            onClick={() => navigateToPage("/home")}
          />
        </div>
        <form onSubmit={handleEdit}>
          <div className="form">
            <h1>Editar Perfil</h1>
            <Labels
              variant="inputText"
              name="Nome"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Labels
              variant="inputText"
              name="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Labels
              variant="Password"
              name="Senha"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Labels
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
            <div className="teste">
              <button className="btnDefault delete">Excluir Conta</button>
              <button type="submit" className="btnDefault">
                {isLoading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </form>
        <div className="rightSide"></div>
      </div>
    </div>
  );
}
export default Edit;
