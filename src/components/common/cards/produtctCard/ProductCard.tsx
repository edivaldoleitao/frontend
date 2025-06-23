import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  liked?: boolean;
}

export default function ProductCard({
  image,
  name,
  price,
  rating,
  reviews,
  liked = false
}: ProductCardProps) {
  return (
    <div className="bg-gray-200 rounded-lg shadow-sm p-4 min-w-[200px] flex flex-col">
      <div className="relative mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-32 object-cover rounded-md bg-gray-200"
        />
        <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
          <Heart
            className={`w-4 h-4 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
          />
        </button>
      </div>

      <div className="flex items-center gap-1 mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">({reviews})</span>
      </div>

      <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">{name}</h3>

      <div className="mt-auto">
        <span className="text-green-600 font-bold text-lg">{price}</span>
      </div>
    </div>
  );
}
