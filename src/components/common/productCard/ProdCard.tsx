import React from "react";
import "./ProdCard.css";
import type { Product } from "../../../features/favorite/types/favorite";
import Favorite from "../favorite/Favorite";
import type { User } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  miniature: boolean;
  isOpen: boolean;
  setType: (value: "warning" | "error" | "success") => void;
  setError: (value: string | null) => void;
  user: User | null | undefined;
  edit: boolean;
}

const ProdCard: React.FC<ProductCardProps> = ({
  product,
  setError,
  setType,
  user,
  edit,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/produtos?q=${product.product_name}`);
  };

  return (
    <div className="product-card">
      <div onClick={handleClick}>
        <div className="product-image-container">
          <img
            src={product.image_url}
            alt={`${product.product_name}`}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.product_name}</h3>
          <p className="product-model">Adicionado em: {product.created_at}</p>
        </div>
      </div>
      {edit ? (
        <div className="favorite-button">
          <div className="">
            <Favorite
              product={product.product}
              miniature={true}
              isOpen={false}
              setType={setType}
              setError={setError}
              user={user}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProdCard;
