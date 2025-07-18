export interface fetchPrivates {
  products: Product[];
}

export interface Product {
  product: number;
  product_name: string;
  image_url: string;
  created_at: string;
}
