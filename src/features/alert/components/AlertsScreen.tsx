import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { ProductCard } from "./ProductCard";
import { useAlertsByUser } from "../hooks/useAlertsByUser";
import { useAuth } from "../../../context/AuthContext.tsx";

export const AlertsScreen = () => {
  const { user } = useAuth();
  const userId = user?.id;

  if (!userId) {
    return <p>Usuário não autenticado.</p>;
  }

  const { data, loading, refetch } = useAlertsByUser(userId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;

  const products = useMemo(() => {
    if (!data?.isAlert) return [];
    return data.alerts.map((alert) => ({
      id: alert.id,
      name: alert.product.name,
      image: alert.product.image,
      url_product: alert.product.url_product,
      currentPrice: `R$ ${Number(alert.product.current_price).toFixed(2)}`,
      desiredPrice: `R$ ${Number(alert.desired_price).toFixed(2)}`,
      is_active: alert.is_active,
    }));
  }, [data]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  if (loading) return <p>Carregando alertas...</p>;
  if (!products.length) return <p>Nenhum alerta encontrado.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <StatsCard />

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <h2 className="text-3xl font-bold text-[#1F4BC2] text-foreground flex-1 text-center">
          Alertas
        </h2>

        <button
          onClick={handleNext}
          className="p-2 rounded-full text-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          aria-label="Próximo"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdate={() => refetch()}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary shadow-lg"
                : "bg-muted hover:bg-primary/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
