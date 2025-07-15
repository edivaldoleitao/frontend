import { Search, User, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import whiteLogo from "../../../assets/logoBranca.png";
import { useNavigate, useLocation } from "react-router-dom";
import type { ProductWithPrice } from "../../../features/listProducts/types/type";
import { getProductsWithQuery } from "../../../features/listProducts/services/getProductsWithQuery";

const categoryLabels: Record<string, string> = {
  gpu: "Placa de Vídeo",
  cpu: "Processador",
  ram: "Memória RAM",
};

const labelToCategory = Object.entries(categoryLabels).reduce(
  (acc, [key, value]) => ({ ...acc, [value.toLowerCase()]: key }),
  {} as Record<string, string>
);

interface AppBarProps {
  onSearch: (query: string) => void;
}

const AppBar = ({ onSearch }: AppBarProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<ProductWithPrice[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getCategoryIfExists = (input: string): string | undefined => {
    return labelToCategory[input.trim().toLowerCase()];
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    const category = params.get("category");

    if (q) setSearchInput(q);
    if (category) setSelectedCategory(category);
  }, [location.search]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchInput.trim().length > 1 || selectedCategory !== "") {
        const result = await getProductsWithQuery(searchInput, selectedCategory);
        setSuggestions(result.products);
        setShowSuggestions(true);
      } else {
        const result = await getProductsWithQuery("", "", 10, 0);
        setSuggestions(result.products);
        setShowSuggestions(true);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchInput, selectedCategory]);

  const handleSelect = (query: string) => {
    setSearchInput(query);
    setShowSuggestions(false);
    setShowCategoryFilter(false);
    onSearch(query);

    const category = getCategoryIfExists(query) || selectedCategory;
    const param = category
      ? `category=${encodeURIComponent(category)}`
      : `q=${encodeURIComponent(query)}`;

    navigate(`/produtos?${param}`);
  };

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setSearchInput("");
    setShowSuggestions(false);
    setShowCategoryFilter(false);

    if (categoryKey) {
      onSearch(categoryKey);
      navigate(`/produtos?category=${categoryKey}`);
    } else {
      onSearch("");
      navigate(`/produtos`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim()) {
      handleSelect(searchInput.trim());
    }
  };

  const handleInputFocus = () => {
    setShowCategoryFilter(true);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
      setShowCategoryFilter(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearCategory = () => {
    setSelectedCategory("");
    setSearchInput("");
    setShowSuggestions(false);
    setShowCategoryFilter(false);
    onSearch("");
    navigate("/produtos");
  }


  return (
    <header className="bg-blue-600 text-white p-4 relative z-50">
      <div className="container mx-auto flex items-center flex-wrap gap-4">
        <a className="flex-shrink-0" href="/">
          <img src={whiteLogo} alt="Logo Branco" className="h-16 w-auto" />
        </a>

        <div className="flex-grow flex justify-center">
          <div className="w-full max-w-lg relative" ref={searchRef}>
            <div className="relative">
              {selectedCategory && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm truncate max-w-[150px] flex items-center gap-1">
                  {categoryLabels[selectedCategory]}
                  <button
                    onClick={clearCategory}
                    className="ml-1 font-bold text-white hover:text-gray-200"
                  >
                    ×
                  </button>
                </div>
              )}

              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                placeholder="Digite para buscar..."
                className={`w-full py-2 pr-12 rounded-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 ${selectedCategory ? "pl-40" : "pl-4"
                  }`}
              />

              <div className="absolute right-3 top-2.5 flex items-center gap-2">
                {searchInput && (
                  <button
                    onClick={() => {
                      setSearchInput("");
                      setShowSuggestions(false);
                      onSearch("");
                      navigate("/produtos");
                    }}
                    className="text-gray-400 hover:text-gray-600 font-bold text-lg leading-none"
                  >
                    ×
                  </button>
                )}
                <button
                  onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {showCategoryFilter && (
              <div className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-md overflow-hidden z-50">
                <div className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50 border-b">
                  Filtrar por categoria
                </div>
                <button
                  onClick={() => handleCategorySelect("")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                >
                  Todas as categorias
                </button>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => handleCategorySelect(value)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-100 ${selectedCategory === value
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700"
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-md overflow-hidden max-h-60 overflow-y-auto z-50">
                <div className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-50 border-b">
                  Produtos encontrados
                </div>
                {suggestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(item.name)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 relative" ref={menuRef}>
          <div
            className="bg-white/30 p-2 rounded-full backdrop-blur-sm cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <User className="w-6 h-6 text-white" />
          </div>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/50"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-blue-800 rounded-lg shadow-lg py-2 z-50 text-center text-white">
                <a href="/EditProfile" className="block py-2 border-b border-white/20 hover:bg-blue-700">Editar Perfil</a>
                <a href="/assinatura" className="block py-2 border-b border-white/20 hover:bg-blue-700">Minha assinatura</a>
                <a href="/favoritos" className="block py-2 border-b border-white/20 hover:bg-blue-700">Meus Favoritos</a>
                <a href="/alertas" className="block py-2 border-b border-white/20 hover:bg-blue-700">Meus Alertas</a>
                <button onClick={() => navigate("/login")} className="block w-full py-2 hover:bg-blue-700">Sair</button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppBar;
