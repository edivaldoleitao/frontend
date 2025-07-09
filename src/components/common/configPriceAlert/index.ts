import type { User } from "../../../context/AuthContext";
import type { Product } from "../../../features/productDetail/types/productDetail";

interface AlertConfigModalProps {
  isOpen: boolean;
  id_product: number;
  onClose: () => void;
  productName?: string;
  alert: Alert | null;
  setAlert: (value: Alert | null) => void;
  user: User | null | undefined;
}

interface PriceAlertRequest {
  expectedPrice: number;
  duration: number;
}

interface AlertBTNProps {
  product: Product;
  setIsAlertModalOpen: (value: boolean) => void;
  miniature: boolean;
  alert: Alert | null;
}

interface RequestAlert {
  user_id: number;
  product_id: number | undefined;
  desired_price: number;
  created_at: string;
  expires_at: string;
}

interface Alert {
  id: number;
  user: number;
  product: number;
  desired_price: number;
  is_active: boolean;
  created_at: string;
  expires_at: string;
}

export interface PriceAlertProps {
  alert: Alert | null;
  setAlert: (value: Alert | null) => void;
}

export type {
  AlertConfigModalProps,
  PriceAlertRequest,
  AlertBTNProps,
  Alert,
  RequestAlert,
};
