export interface UserSpecification {
  user_id: number; 
  cpu: string;
  ram: string;
  motherboard: string;
  cooler?: string;
  gpu?: string;
  storage?: string;
  psu?: string;
}
