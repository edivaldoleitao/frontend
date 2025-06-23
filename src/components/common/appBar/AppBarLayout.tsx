
import { Search, User } from "lucide-react"
import whiteLogo from "../../../assets/logoBranca.png";


const AppBar = () => {
  return (
    <header className="bg-blue-600 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 ">
         <img src={whiteLogo} alt="Logo" className="w-[30%]" />
      </div>
      
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar produtos..."
            className="w-full bg-white rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>
      
      <div className="bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-colors cursor-pointer">
        <User className="text-white w-5 h-5" />
      </div>
    </header>
  )
}

export default AppBar;