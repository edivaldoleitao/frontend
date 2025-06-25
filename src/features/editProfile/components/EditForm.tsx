import "./EditForm.css";
import { useNavigate } from "react-router-dom";
import { Labels } from "./index.ts";
import { ChevronLeft } from "lucide-react";
import { useEdit } from "../hooks/useEdit.ts";
import { CategoriasSelector } from "../../../components/common/select/CategoriasSelector";
import { AlertMessage } from "../../../components/common/alert/AlertMessage.tsx";

function Edit() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    selectedCategories,
    setSelectedCategories,
    error,
    setError,
    isLoading,
    handleEdit,
  } = useEdit();

  const navigate = useNavigate();

  function navigateToPage(page: string) {
    navigate(page);
  }

  return (
    <div className="background">
      {error && (
        <AlertMessage
          type="error"
          message={error}
          onClose={() => setError("")}
        />
      )}
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
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Labels
              variant="inputText"
              name="Email"
              id="email"
              value={email}
              placeholder={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
            <CategoriasSelector
              label="Categorias Favoritas"
              options={["gamer", "home_office", "estudo"]}
              selected={selectedCategories}
              setSelected={setSelectedCategories}
            />
            <div className="teste">
              <button className="btnDefault delete" onClick={handleEdit}>
                Excluir Conta
              </button>
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
