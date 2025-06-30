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
    <div className="bg-gray-100 rounded-xl border border-gray-300 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-20 h-20 object-contain bg-white rounded-md"
          />
        </div>

        <div className="flex-1 flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="text-gray-900 font-semibold text-sm">{title}</h3>

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
            <div className="flex items-center space-x-2 gap-2">
              <div className="mt-4 flex flex-row gap-1.5">
                {tag && (
                  <div className={`${tagColor} text-white px-4 py-1.5 rounded-full font-bold text-base`}>
                    {tag}
                  </div>
                )}
                <div className="bg-blue-900 text-white px-4 py-1.5 rounded-full font-bold text-base">
                  {price}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold">Vendido por:</span>
              </div>
            </div>
            <img src={sellerLogo} alt={seller} className="h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductCard;
