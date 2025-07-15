import React from "react";
import { Heart } from "lucide-react";
import "./ProdCard.css";

interface Product {
  id: number;
  name: string;
  model: string;
  image: string;
  isFavorite: boolean;
}

interface ProductCardProps {
  product: Product;
  onToggleFavorite: (productId: number) => void;
}

const ProdCard: React.FC<ProductCardProps> = ({
  product,
  onToggleFavorite,
}) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={`${product.name} ${product.model}`}
          className="product-image"
        />
        <button
          className={`favorite-button ${product.isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(product.id)}
        >
          <Heart
            size={16}
            fill={product.isFavorite ? "#ff4757" : "none"}
            color={product.isFavorite ? "#ff4757" : "#666"}
          />
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-model">{product.model}</p>
      </div>
    </div>
  );
};

export default ProdCard;
