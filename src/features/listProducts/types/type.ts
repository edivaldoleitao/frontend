export interface StoreInfo {
  id: number;
  name: string;
  logo_url: string;
}

export interface ProductWithPrice {
  product_id: number;
  name: string;
  category: string;
  brand: string;
  image_url: string;
  store: StoreInfo;
  price: string;             
  collection_date: string;  
  rating?: number; 
  reviewCount?: number;
  favorite_id?: number ;
}

export interface ProductPriceResponse {
  products: ProductWithPrice[];
  total: number;
}
