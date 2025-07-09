import type { User } from "../../../context/AuthContext.ts";
import type { Product } from "../../../features/productDetail/types/productDetail.tsx";

export interface favoriteCheck {
  user_id: number;
  product_id: number;
}

export interface favoriteCheckResponse {
  favorite: boolean;
  id_fav?: number;
}

export interface favoriteProps {
  product: Product;
  miniature: boolean;
  isOpen: boolean;
  setType: (value: "warning" | "error" | "success") => void;
  setError: (value: string | null) => void;
  user: User | null | undefined;
}

export interface favoriteRequest {
  user_id: number;
  product_id: number;
  created_at: string;
}

export interface responseCreateFav {
  id: number;
  user: number;
  user_id: number;
  product_id: number;
  created_at: string;
}
