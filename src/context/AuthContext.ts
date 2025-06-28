import type { ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  categories: string[];
}

export interface AuthContextType {
  user: User | null | undefined;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
