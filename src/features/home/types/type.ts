
export interface ProductStoreBestRating {
  id: number;
  product: number;
  product_name: string;
  store: number;
  store_name: string;
  rating: number;
  url_product: string;
  available: boolean;
  price: string;
  image_url: string;
  favorite_id?: number;
}

export interface FavoriteResponse {
  id: number;
  user_id: number;
  product_id: number;
  created_at: string; 
}
