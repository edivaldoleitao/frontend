import { Link } from "react-router-dom";
import { Heart, Star, ShoppingCart, ExternalLink } from "lucide-react";
import { useState } from "react";
import type { ProductStoreBestRating } from "../../../../../features/home/types/type";
import { useAddFavorite } from "../../../../../features/home/hook/useAddFavorite";
import { deleteFavorite } from "../../../../../features/home/service/deleteFavorite";
import { useAuth } from "../../../../../context/AuthContext.tsx";
import kabumLogo from "../../../../../assets/icons/kabum.png";
import terabyteLogo from "../../../../../assets/icons/terabyte.png";
import amazonLogo from "../../../../../assets/icons/amazon.svg";

interface ProductCardProps {
  product: ProductStoreBestRating;
  liked?: boolean;
}

const storeLogos: Record<string, string> = {
  Kabum: kabumLogo,
  Terabyte: terabyteLogo,
  Amazon: amazonLogo,
};


export default function ProductCard({ product }: ProductCardProps) {
  const {
    image_url,
    product_name,
    price,
    rating,
    store_name,
    available,
    url_product,
    favorite_id,
    product: productId,
  } = product;

  const { add, loading, error } = useAddFavorite();
  const [localFavoriteId, setLocalFavoriteId] = useState<number | null>(favorite_id ?? null);
  const [localLiked, setLocalLiked] = useState(!!favorite_id);


  const { user } = useAuth();
  if (!user) return null;

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
      console.error("Erro ao alternar favorito:", err);
    }
  };

  return (
    <Link
      to={`/product/${productId}`}
      className="group overflow-hidden border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white w-[290px] min-w-[240px] flex flex-col no-underline text-inherit"
    >
      <div className="relative overflow-hidden">
        <img
          src={image_url || "/placeholder.svg"}
          alt={product_name}
          className="w-full h-44 object-contain bg-white px-2 pt-2"
        />

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={handleToggleFavorite}
            disabled={loading}
            className="h-8 w-8 rounded-full bg-white/90 shadow-md flex items-center justify-center"
          >
            <Heart
              className={`h-4 w-4 transition-colors duration-200 ${localLiked ? "text-red-500 fill-red-500" : "text-gray-400"
                }`}
            />
          </button>
        </div>
        {storeLogos[store_name] && (
          <img
            className="absolute top-2 left-2 w-12 h-auto"
            src={storeLogos[store_name]}
            alt={store_name}
          />
        )}

      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 min-h-[3rem]">
            {product_name}
          </h3>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({rating.toFixed(1)})</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 flex items-end justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900">R$ {price}</span>
          {!available && <span className="text-sm text-red-500">Indisponível</span>}
        </div>

        <div className="flex gap-2">
          <button
            disabled={!available}
            onClick={(e) => e.stopPropagation()}
            className={`text-white text-xs font-medium px-3 py-1 rounded transition-colors ${available
                ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            <ShoppingCart className="h-4 w-4 inline mr-1" />
            Comprar
          </button>

          <a
            href={url_product}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="border border-gray-300 px-2 py-1 rounded hover:bg-gray-100 transition text-gray-700"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {error && <p className="text-xs text-red-500 mt-1 px-4">Erro ao favoritar</p>}
    </Link>
  );
}
