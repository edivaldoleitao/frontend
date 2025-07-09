// Interface para o objeto de produto principal
export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string;
  brand: string;
  hash: string;
  specific_details: Record<string, any>;
}

// Interface para o objeto de loja do produto
export interface ProductStore {
  product: number;
  store: number | string;
  url_product: string;
  available: boolean;
  rating: number;
}

// Interface para um registro de preço
export interface PriceEntry {
  product_store: number;
  value: string;
  collection_date: string;
}

export interface OtherStores {
  store_name: string;
  value: number;
  ps_id: number;
}

// Interface principal que une todas as outras
export interface ProductData {
  price: PriceEntry;
  product_store: ProductStore;
  product: Product;
  price_history: PriceEntry[];
  other_stores: OtherStores[];
}

//TESTES
export interface fetchProductResponse {
  name: string;
  category: string;
  description: string;
  image_url: string;
  brand: string;
  specific_details: {
    model: string;
    vram: number;
    chipset: string;
    max_resolution: string;
    output: string;
    tech_support: string;
  };
}

export interface ProductDatailLayout {
  name: string;
  category: string;
  description: string;
  image_url: string;
  brand: string;
  specific_details: string[];
  rating: number;
  reviewCount: number;
}

export interface AlertCheck {
  user_id: number;
  product_id: number;
}

export interface Alert {
  id: number;
  user: number;
  product: number;
  desired_price: number;
  is_active: boolean;
  created_at: string;
  expires_at: string;
}

export interface AlertCheckResponse {
  isAlert: boolean;
  alert?: Alert | null;
}
