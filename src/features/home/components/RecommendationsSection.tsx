import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../../../components/common/cards/produtctCard/recommended/ProductCardRecommended";
import type { Product } from "../types/type";


interface RecommendationsSectionProps {
  products: Product[];
}

export default function RecommendationsSection({ products }: RecommendationsSectionProps) {
  return (
    <section className="px-4 py-6">
      <h2 className="text-blue-600 text-4xl font-bold mb-4">Nossas recomendações</h2>

      <div className="relative">
        <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-12">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
