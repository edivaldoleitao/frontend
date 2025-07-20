import type { PlanCardDetailsProps } from "../types/type.ts";

const PlanCardDetails = ({ plan }: PlanCardDetailsProps) => {
  const formatQuantity = (quantity: number) => {
    return quantity === Infinity ? 'Sem limite de ' : quantity;
  };

  return (
    <div className="flex-grow mb-6">
      <p className="font-bold text-gray-700 mb-2">Este plano inclui:</p>
      <ul className="space-y-2 text-sm text-gray-600">
        <li key={"favorites-qtd"} className="flex items-center">
          <span className="text-blue-500 mr-2 mt-1">•</span>
          <span>{formatQuantity(plan.favorite_quantity)} Favoritos</span>
        </li>
        <li key={"alerts-qtd"} className="flex items-center">
          <span className="text-blue-500 mr-2 mt-1">•</span>
          <span>{formatQuantity(plan.alert_quantity)} Alertas</span>
        </li>
        <li key={"interactions-qtd"} className="flex items-center">
          <span className="text-blue-500 mr-2 mt-1">•</span>
          <span>{formatQuantity(plan.interactions_quantity) } Interações com o TrackBot</span>
        </li>
      </ul>
    </div>
  );
};

export default PlanCardDetails;
