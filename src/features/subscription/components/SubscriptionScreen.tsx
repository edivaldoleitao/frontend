import { useState } from "react";
import { useAuth } from "../../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import PlanCard from "./PlanCard.tsx";


export const SubscriptionScreen = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const [activePlan, setActivePlan] = useState<string>('basic');
  const navigate = useNavigate();

  if (!userId) {
    return <p>Usuário não autenticado.</p>;
  }

  const handleSelectPlan = (planId: string) => {
    if (user) {
      console.log(`Usuário ${user.name} selecionou o plano ${planId}`);
      // Aqui você chamaria a API para atualizar o plano do usuário no backend
      // Ex: api.post(`/user/${user.id}/subscription`, { new_type: planId });
      setActivePlan(planId);
    }
  };

  const mockSubscriptionPlans = [
    {
      id: 'basic',
      title: 'Plano Básico',
      description: 'A versão gratuita do TrackSave, com recursos limitados.',
      favorite_quantity: 5,
      alert_quantity: 1,
      interactions_quantity: 5,
      price_htr_quantity: 1,
      value: 0.0
    },
    {
      id: 'standard',
      title: 'Plano Standard',
      description: 'Versão padrão para usuários que adoram procurar ofertas e interagir mais com o TrackBot.',
      favorite_quantity: 50,
      alert_quantity: 10,
      interactions_quantity: 50,
      price_htr_quantity: 10,
      value: 7.90
    },
    {
      id: 'premium',
      title: 'Plano Premium',
      description: 'Versão premium para usuários que querem aproveitar ao máximo o Track&Save.',
      favorite_quantity: Infinity,
      alert_quantity: Infinity,
      interactions_quantity: Infinity,
      price_htr_quantity: Infinity,
      value: 14.90
    }
  ]

  const mockUserPlan = {
    "id": 1,
    "is_active": true,
    "user": user,
    "subscription": {
      "id": 1,
      "type": "basic",
      "title": "Plano Básico",
      "description": "A versão gratuita do TrackSave, com recursos limitados.",
      "favorite_quantity": 5,
      "alert_quantity": 1,
      "interactions_quantity": 5,
      "price_htr_quantity": 1,
      "value": 0.0
    }
  };

  const subscriptionPlans = mockSubscriptionPlans.map(plan => ({
    ...plan,
    isActive: plan.id === mockUserPlan.subscription.type
  }));

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <ChevronLeft className="arrow" onClick={() => navigate(-1)} />
        <h2 className="text-3xl font-bold text-gray-800 text-center flex-grow">Assinatura</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subscriptionPlans.map(plan => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isActive={plan.id === activePlan}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </div>
    </main>
  );
};
