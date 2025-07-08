import { Search, ShoppingCart, Computer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoBranco from '../../../assets/logoBranca.png';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: Computer,
      text: "Qual o melhor para meu uso?",
      description: "Descubra produtos ideais",
      path: "/"
    },
    {
      icon: ShoppingCart,
      text: "Encontrar o upgrade ideal",
      description: "Melhore suas compras",
      path: "/upgrade"
    },
    {
      icon: Search,
      text: "Buscar as melhores ofertas",
      description: "Economize mais",
      path: "/home"
    }
  ];

  return (
    <aside className="w-80 h-screen fixed left-0 top-0 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 shadow-2xl overflow-y-auto z-10">
      <div className="mb-12">
        <div className="flex items-center mb-2">
          <img
            src={logoBranco}
            className="w-[300px] h-[160px] object-contain"
            alt="Logo"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl mb-6 opacity-90">
          O que você procura?
        </h3>

        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              <div className="w-6 h-6 flex items-center justify-center text-white">
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="text-white font-medium text-sm">
                {item.text}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;