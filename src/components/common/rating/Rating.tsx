import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  review: number | string; // Changed to 'review' to match the ProductDetailComponent usage
}

const Rating = ({ rating, review }: RatingProps) => {
  return (
    <div className="flex items-center space-x-2 max-[400]:flex-col">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-gray-600 text-sm">({review})</span>
    </div>
  );
};

export default Rating;
