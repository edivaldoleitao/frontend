import { Search, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import whiteLogo from "../../../assets/logoBranca.png";
import { useNavigate } from "react-router-dom";
import type { ProductWithPrice } from "../../../features/listProducts/types/type";
import { getProductsWithQuery } from "../../../features/listProducts/services/getProductsWithQuery";

interface AppBarProps {
  onSearch: (query: string) => void;
}

const AppBar = ({ onSearch }: AppBarProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<ProductWithPrice[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchInput.trim().length > 1) {
        try {
          const result = await getProductsWithQuery(searchInput);
          setSuggestions(result.products);
          setShowSuggestions(true);
        } catch {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchInput]);

  const handleSelect = (query: string) => {
    setSearchInput(query);
    setShowSuggestions(false);
    onSearch(query);
    navigate(`/produtos?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim()) {
      handleSelect(searchInput.trim());
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4 relative z-50">
      <div className="container mx-auto flex items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={whiteLogo} alt="Logo Branco" className="h-16 w-auto" />
        </div>

        {/* Barra de busca */}
        <div className="flex-grow flex justify-center px-4">
          <div className="w-full max-w-md relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite para buscar..."
              className="w-full px-4 py-2 rounded-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-md overflow-hidden max-h-60 overflow-y-auto z-50">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(item.name)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 cursor-pointer"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Ícone do usuário e dropdown */}
        <div className="flex-shrink-0 ml-4 relative" ref={menuRef}>
          <div
            className="bg-white/30 p-2 rounded-full backdrop-blur-sm cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <User className="w-6 h-6 text-white" />
          </div>

          {menuOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setMenuOpen(false)}
            />
          )}


          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-blue-800 rounded-lg shadow-lg py-2 z-50 text-center text-white">
              <a href="/EditProfile" className="block py-2 border-b border-white/20 hover:bg-blue-700">Editar Perfil</a>
              <a href="/assinatura" className="block py-2 border-b border-white/20 hover:bg-blue-700">Minha assinatura</a>
              <a href="/favoritos" className="block py-2 border-b border-white/20 hover:bg-blue-700">Meus Favoritos</a>
              <a href="/alertas" className="block py-2 border-b border-white/20 hover:bg-blue-700">Meus Alertas</a>
              <button onClick={() => navigate("/login")} className="block w-full py-2 hover:bg-blue-700">Sair</button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default AppBar;
