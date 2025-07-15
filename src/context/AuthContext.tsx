import { createContext, useContext, useEffect, useState } from "react";
import { FetchUserData } from "../service/fetchUserData";
import type {
  User,
  AuthContextType,
  AuthProviderProps,
} from "./AuthContext.ts";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const userData = await FetchUserData(token);
        console.log("Dados do usuário:", userData);
        setUser({
          ...userData,
          id: Number(userData.id),
        });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        logout();
        setUser(null);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
  };

  const contextData: AuthContextType = {
    user,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>{children} </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
