import { TrendingUp, Bell, Target } from "lucide-react";
import { Card, CardContent } from "../../../components/common/cards/produtctCard/alert/Card";
import { useAlertStats } from "../hooks/useAlertStats";
import { useAuth } from "../../../context/AuthContext.tsx";

export const StatsCard = () => {
  const {user } = useAuth();
  const userId = user?.id;

  if (!userId) {
    return <p>Usuário não autenticado.</p>;
  }
  const { data, loading } = useAlertStats(userId);

  if (loading || !data) return null;

  const stats = [
    {
      icon: <Bell className="h-5 w-5 text-white" />,
      label: "Alertas Ativos",
      value: data.active_alerts.toString(),
      bg: "bg-green-500",
      text: "text-green-600",
    },
    {
      icon: <Target className="h-5 w-5 text-white" />,
      label: "Meta Atingida",
      value: data.goals_hit.toString(),
      bg: "bg-yellow-500",
      text: "text-yellow-600",
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-white" />,
      label: "Economia Total",
      value: `R$ ${Number(data.total_saving).toFixed(2)}`,
      bg: "bg-blue-500",
      text: "text-blue-600",
    },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl w-full">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300"
          >
            <CardContent className="flex items-center justify-center text-center gap-4 p-6 h-full mt-2">
              <div className={`p-3 rounded-full ${stat.bg} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.text}`}>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
