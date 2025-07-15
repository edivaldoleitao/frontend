import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { ProductStoreBestRating } from "../types/type";
import ProductCard from "../../../components/common/cards/produtctCard/recommended/ProductCardRecommended";

interface ProductCarouselProps {
    products: ProductStoreBestRating[];
    title: string;
}

export function ProductCarousel({ products, title }: ProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            const newScrollLeft =
                scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
            scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });

            setTimeout(() => {
                if (scrollRef.current) {
                    setCanScrollLeft(scrollRef.current.scrollLeft > 0);
                    setCanScrollRight(
                        scrollRef.current.scrollLeft <
                        scrollRef.current.scrollWidth - scrollRef.current.clientWidth
                    );
                }
            }, 300);
        }
    };

    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-6 ">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2860F8]">{title}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className="h-9 w-9 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-blue-100 disabled:opacity-40"
                    >
                        <ChevronLeft className="h-5 w-5 text-blue-600 mx-auto" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className="h-9 w-9 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-blue-100 disabled:opacity-40"
                    >
                        <ChevronRight className="h-5 w-5 text-blue-600 mx-auto" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto  scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {products.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-80">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
