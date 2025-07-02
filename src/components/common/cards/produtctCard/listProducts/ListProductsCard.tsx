import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  price: string;
  seller: string;
  sellerLogo: string;
  rating: number;
  reviewCount: number;
  isFavorited?: boolean;
  tag?: string;
  tagColor?: string;
}

const ListProductCard = ({
  image,
  title,
  badge,
  badgeColor = "bg-yellow-500",
  price,
  seller,
  sellerLogo,
  rating,
  reviewCount,
  isFavorited = false,
  tag,
  tagColor = "bg-green-500",
}: ProductCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="bg-[#D9D9D9] rounded-xl border border-gray-300 p-4 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-20 h-20 object-contain bg-white rounded-md border-1"
          />
        </div>

        <div className="flex-1 flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="text-gray-900 font-semibold text-sm text-left">{title}</h3>

            {badge && (
              <span className={`${badgeColor} text-white text-[10px] px-2 py-1 rounded-full font-bold w-max mt-1`}>
                {badge}
              </span>
            )}

            <div className={`flex items-center space-x-2 ${badge ? "mt-2" : "mt-6"}`}>
              <Heart
                className={`w-4 h-4 ${isFavorited ? "text-red-500 fill-current" : "text-gray-400"}`}
              />
              <span className="text-gray-600 text-xs">({reviewCount})</span>
              <div className="flex space-x-0.5">{renderStars(rating)}</div>
            </div>
          </div>

          <div className="flex flex-col items-end text-right ml-4">
            {/* Tag e Bloco Preço + Vendedor */}
            <div className="flex flex-row items-center gap-2 mt-4">
              {/* Tag (se houver) */}
              {tag && (
                <div className={`${tagColor} text-white px-4 py-1.5 rounded-full font-bold text-base`}>
                  {tag}
                </div>
              )}

              {/* Preço + Vendido por + Logo */}
              <div className="flex items-center gap-2">
                {/* Preço */}
                <div className="bg-blue-900 text-white px-4 py-1.5 rounded-full font-bold text-base">
                  {price}
                </div>

                {/* Texto e imagem do vendedor */}
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-semibold">Vendido por:</span>
                  <img src={sellerLogo} alt={seller} className="h-6 mt-0.5" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ListProductCard;
