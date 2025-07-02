import { useEffect, useMemo, useState } from "react";
import ListProductCard from "../../../components/common/cards/produtctCard/listProducts";
import FilterBar from "../components/FilterBar";
import { useSearchProducts } from "../hooks/useSearchProducts";
import type { ProductWithPrice } from "../types/type";
import { X } from "lucide-react";

interface ProductListProps {
  searchQuery: string;
}

function iconStore(product: ProductWithPrice): string {
  const logos: Record<string, string> = {
    Amazon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    Kabum: "https://static.kabum.com.br/conteudo/icons/logo.svg",
    Terabyte: "https://img.terabyteshop.com.br/terabyte-logo.svg",
  };

  return logos[product.store.name] || "https://via.placeholder.com/80x40?text=Loja";
}

const ProductList = ({ searchQuery }: ProductListProps) => {
  const [filters, setFilters] = useState({ seller: "", rating: "" });
  const { products = [], loading, error } = useSearchProducts(searchQuery);
  const [showToast, setShowToast] = useState(false);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSeller = filters.seller
        ? product.store.name.toLowerCase().includes(filters.seller.toLowerCase())
        : true;

      const matchRating = filters.rating
        ? product.rating && product.rating >= parseInt(filters.rating)
        : true;

      return matchSeller && matchRating;
    });
  }, [filters, products]);

  useEffect(() => {
    if (!loading && !error && filteredProducts.length === 0 && products.length > 0) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  }, [filteredProducts, loading, error, products.length]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="min-h-screen py-6 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <FilterBar onFilterChange={handleFilterChange} />

        {loading && <p className="mt-4 text-sm text-gray-500">Carregando produtos...</p>}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <div className="space-y-4 mt-4">
          {filteredProducts.map((product, index) => (
            <ListProductCard
              key={index}
              image={product.image_url}
              title={product.name}
              price={`R$${product.price}`}
              seller={product.store.name}
              sellerLogo={iconStore(product)}
              rating={product.rating || 0}
              reviewCount={product.reviewCount || 0}
              isFavorited={false}
            />
          ))}
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-yellow-500 text-white px-6 py-2 rounded-full flex items-center shadow-md">
            <span className="text-sm font-medium">
              Não há produtos para os filtros selecionados
            </span>
            <button onClick={() => setShowToast(false)} className="ml-3">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
