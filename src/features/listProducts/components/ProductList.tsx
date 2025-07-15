import { useEffect, useState } from "react";
import ListProductCard from "../../../components/common/cards/produtctCard/listProducts";
import FilterBar from "../components/FilterBar";
import { useSearchProducts } from "../hooks/useSearchProducts";
import type { ProductWithPrice } from "../types/type";
import { AlertCircle } from "lucide-react";
import { ProductListSkeleton } from "./LoadingSkeleton";
import { NoProductsFound } from "./EmptyState";
import { Pagination } from "./Pagination";
import { Toast } from "./Toast";

interface ProductListProps {
  searchQuery: string;
  isCategory?: boolean;
}

function iconStore(product: ProductWithPrice): string {
  const logos: Record<string, string> = {
    Amazon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    Kabum: "https://static.kabum.com.br/conteudo/icons/logo.svg",
    Terabyte: "https://img.terabyteshop.com.br/terabyte-logo.svg",
  };

  return logos[product.store.name] || "https://via.placeholder.com/80x40?text=Loja";
}

const ProductList = ({ searchQuery, isCategory = false }: ProductListProps) => {
  const [filters, setFilters] = useState({
    seller: "",
    rating: "",
    price: "",
    brand: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const {
    products = [],
    total = 0,
    loading,
    error,
  } = useSearchProducts(
    isCategory ? "" : searchQuery,
    isCategory ? searchQuery : undefined,
    page,
    perPage,
    filters 
  );

  const hasActiveFilters = Object.values(filters).some(Boolean);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setPage(1); 
  };

  useEffect(() => {
    if (!loading && !error && products.length === 0 && hasActiveFilters) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  }, [products, loading, error, hasActiveFilters]);

  const totalPages = Math.ceil(total / perPage);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, JSON.stringify(filters)]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm ">
            <div className="flex items-center justify-center flex-col text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro ao carregar produtos</h3>
              <p className="text-gray-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 mt-6 mb-6 bg-gray-50 rounded-lg border border-gray-200">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}

        <div>
          {loading ? (
            <div className="p-6">
              <ProductListSkeleton />
              {totalPages > 1 && (
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border text-center text-gray-400 text-sm">
                  Carregando paginação...
                </div>
              )}
            </div>
          ) : products.length === 0 ? (
            <div className="p-6">
              <NoProductsFound hasFilters={hasActiveFilters} />
            </div>
          ) : (
            <>
              <div className="mb-6 space-y-4">
                {products.map((product) => (
                  <ListProductCard
                    key={product.product_id}
                    productId={product.product_id}
                    image={product.image_url}
                    title={product.name}
                    price={`R$${product.price}`}
                    seller={product.store.name}
                    sellerLogo={iconStore(product)}
                    rating={product.rating || 0}
                    reviewCount={product.reviewCount || 0}
                    favorite_id={product.favorite_id}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="px-6 py-4 mt-6 bg-gray-50 rounded-lg border border-gray-200">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                  <div className="text-center mt-4 text-sm text-gray-500">
                    Página {page} de {totalPages} • {total} produtos no total
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showToast && (
        <Toast
          variant="warning"
          message="Não há produtos para os filtros selecionados"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ProductList;
