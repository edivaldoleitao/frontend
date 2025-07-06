interface AlertConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

interface PriceAlertRequest {
  expectedPrice: number;
  duration: number;
}

export type { AlertConfigModalProps, PriceAlertRequest };
