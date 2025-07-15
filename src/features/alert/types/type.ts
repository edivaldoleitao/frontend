export interface Product {
  id: number;
  name: string;
  image: string;
  current_price: string;
  url_product: string;
}

export interface Alert {
  id: number;
  user: number;
  product: Product;
  desired_price: string;
  is_active: boolean;
  expires_at: string; 
  created_at: string; 
}

export interface GetAlertByUserResponse {
  isAlert: boolean;
  alerts: Alert[];
}

export interface AlertStats {
  active_alerts: number;
  goals_hit: number;
  total_saving: string; 
  last_updated: string; 
}

export interface UpdateAlertPayload {
  desired_price?: string; 
  is_active?: boolean;
  expires_at?: string; 
}

export interface AlertResponse {
  id: number;
  user: number;
  product: number;
  desired_price: string;  
  is_active: boolean;
  expires_at: string;    
  created_at: string; 
}
