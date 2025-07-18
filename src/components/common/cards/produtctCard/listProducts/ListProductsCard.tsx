import { Heart, Star, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../../../context/AuthContext.tsx";
import { useAddFavorite } from "../../../../../features/home/hook/useAddFavorite.ts";
import { deleteFavorite } from "../../../../../features/home/service/deleteFavorite.ts";

interface ProductCardProps {
  productId: number;
  image: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  price: string;
  price_id: number;
  seller: string;
  sellerLogo: string;
  rating: number;
  reviewCount: number;
  favorite_id?: number;
  tag?: string;
  tagColor?: string;
}

const ListProductCard = ({
  productId,
  image,
  title,
  badge,
  badgeColor = "bg-gradient-to-r from-amber-400 to-orange-500",
  price,
  price_id,
  seller,
  sellerLogo,
  rating,
  reviewCount,
  favorite_id,
  tag,
  tagColor = "bg-gradient-to-r from-emerald-400 to-emerald-600",
}: ProductCardProps) => {
  const { user } = useAuth();
  const { add, loading, error } = useAddFavorite();
  const [localFavoriteId, setLocalFavoriteId] = useState<number | null>(null);
  const [localLiked, setLocalLiked] = useState(!!favorite_id);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return;

    const userId = user.id;
    const createdAt = new Date().toISOString().slice(0, 10);

    try {
      if (localLiked && localFavoriteId) {
        await deleteFavorite(localFavoriteId);
        setLocalLiked(false);
        setLocalFavoriteId(null);
      } else {
        const result = await add(userId, productId, createdAt);
        if (result?.id) {
          setLocalLiked(true);
          setLocalFavoriteId(result.id);
        }
      }
    } catch (err) {
      console.error("Erro ao favoritar:", err);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3.5 h-3.5 ${
          index < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Link
      to={`/product/${price_id}`}
      className="group block transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
    >
      <div className="flex flex-col h-full p-4 rounded-xl shadow-md bg-white relative min-h-[150px]">
        {badge && (
          <div className="absolute top-3 left-3 z-20">
            <span
              className={`${badgeColor} text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg`}
            >
              {badge}
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={handleToggleFavorite}
            disabled={loading}
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors duration-200"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${
                localLiked
                  ? "text-red-500 fill-red-500"
                  : "text-gray-400 hover:text-red-400"
              }`}
            />
          </button>
        </div>

        <div className="p-6 flex-grow flex flex-col justify-between">
          <div className="flex items-start gap-6">
            <div className="relative flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <div className="w-24 h-24 rounded-xl p-3 shadow-inner border-2">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-gray-900 font-semibold text-left leading-snug mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {title}
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      {renderStars(rating)}
                    </div>
                    <span className="text-gray-500 text-sm font-medium">
                      {rating.toFixed(1)}
                    </span>
                    <span className="text-gray-400 text-sm">
                      ({reviewCount.toLocaleString()} avaliações)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs font-medium">
                      Vendido por:
                    </span>
                    <div className="flex items-center gap-2">
                      <img
                        src={sellerLogo}
                        alt={seller}
                        className="h-5 w-auto object-contain"
                      />
                      <span className="text-gray-700 text-sm font-medium">
                        {seller}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex flex-col items-end gap-3">
                  {tag && (
                    <span
                      className={`${tagColor} text-white text-sm px-4 py-1.5 rounded-full font-semibold shadow-lg`}
                    >
                      {tag}
                    </span>
                  )}

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {price}
                    </div>

                    <button className="group/btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 mt-2 text-right">
            Erro ao favoritar
          </p>
        )}

        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
  );
};

export default ListProductCard;
