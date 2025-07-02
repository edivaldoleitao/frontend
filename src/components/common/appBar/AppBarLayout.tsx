import { Search, User } from "lucide-react";
import { useEffect, useState } from "react";
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

  return (
    <header className="bg-blue-600 text-white p-4 relative z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={whiteLogo} alt="Logo Branco" className="h-20 w-auto" />
        </div>

        <div className="flex-1 max-w-md mx-8 relative">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite para buscar..."
              className="w-full px-4 py-2 rounded-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

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

        <div className="bg-white/30 p-2 rounded-full backdrop-blur-sm">
          <User className="w-6 h-6 text-white" />
        </div>
      </div>
    </header>
  );
};

export default AppBar;
