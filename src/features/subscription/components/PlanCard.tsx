import Button from "../../../components/common/button/Button";
import type { PlanCardProps } from "../types/type";
import PlanCardDetails from "./PlanCardDetails";

const PlanCard = ({ plan, isActive, onSelectPlan }: PlanCardProps) => {
  const isFree = plan.value === 0;

  const cardStyle = isActive ? 'border-2 border-blue-500 shadow-2xl' : 'border border-gray-200';

  const formatPrice = (value: number) => {
    return value === 0 ? 'Gratuito' : `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  return (
    <div className={`bg-gray-50 rounded-xl p-6 flex flex-col h-full transition-all duration-300 ${cardStyle}`}>
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">{plan.title}</h3>
      <p className="flex items-center justify-center text-center text-gray-500 text-sm mb-4 h-16">{plan.description}</p>

      {/* Seção do Preço */}
      <div className={`text-center font-bold text-white rounded-lg p-3 my-4 text-3xl shadow-lg ${isFree ? 'bg-[#009800]' : 'bg-blue-600'}`}>
        {formatPrice(plan.value)}
      </div>

      {/* Detalhes do Plano */}
      <PlanCardDetails plan={plan} />

      {/* Status e Botão */}
      <div className="mt-auto">
        <p className="text-center font-bold mb-4">
          {isActive && <span><span className="text-green-500">✓</span> Plano Atual</span>}
        </p>
        <Button
          text="Selecionar Plano"
          onClick={() => onSelectPlan(plan.id)}
          disabled={isActive}
        />
      </div>
    </div>
  );
};

export default PlanCard;
