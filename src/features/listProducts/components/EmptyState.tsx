import { Package, Search } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action, 
  className = "" 
}: EmptyStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        {icon || <Package className="w-8 h-8 text-gray-400" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 mb-4 max-w-sm">{description}</p>
      )}
      {action}
    </div>
  );
};

export const NoProductsFound = ({ hasFilters }: { hasFilters: boolean }) => {
  return (
    <EmptyState
      icon={<Search className="w-8 h-8 text-gray-400" />}
      title={hasFilters ? "Nenhum produto encontrado" : "Nenhum resultado"}
      description={
        hasFilters 
          ? "Tente ajustar os filtros para encontrar mais produtos."
          : "Não encontramos produtos para esta busca."
      }
    />
  );
};
