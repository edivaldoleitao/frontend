export interface Plan {
  id: string;
  title: string;
  description: string;
  favorite_quantity: number;
  alert_quantity: number;
  interactions_quantity: number;
  price_htr_quantity?: number;
  value: number;
}

export interface PlanCardProps {
  plan: Plan;
  isActive: boolean;
  onSelectPlan: (planId: string) => void;
}

export interface PlanCardDetailsProps {
  plan: Plan;
}
