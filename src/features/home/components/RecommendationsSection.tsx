import { useEffect } from "react";
import type { ProductStoreBestRating } from "../types/type";
import { ProductCarousel } from "./ProductCarousel";

interface RecommendationsSectionProps {
  products: ProductStoreBestRating[];
}

export default function RecommendationsSection({ products }: RecommendationsSectionProps) {

  useEffect(() => {
    console.log("Recommended products updated:", products);
  }, [JSON.stringify(products)]);


  return (
    <section>
      <ProductCarousel title="Nossas recomendações" products={products} />
    </section>
  );
}
