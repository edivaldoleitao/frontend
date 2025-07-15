import { useState } from "react";
import { ArrowLeft, Share2 } from "lucide-react";
import ProdCard from "../../../components/common/productCard/ProdCard";
import "./Favorite.css";

interface Product {
  id: number;
  name: string;
  model: string;
  image: string;
  isFavorite: boolean;
}

function Favoritos() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "ASUS TUF Gaming",
      model: "B550M-PLUS",
      image: "/lovable-uploads/f6e01227-6636-4324-8acc-4b48180f8158.png",
      isFavorite: true,
    },
    {
      id: 2,
      name: "ASUS Prime",
      model: "A520M-K",
      image: "/lovable-uploads/f6e01227-6636-4324-8acc-4b48180f8158.png",
      isFavorite: true,
    },
    {
      id: 3,
      name: "Biostar B550MX/E",
      model: "PRO",
      image: "/lovable-uploads/f6e01227-6636-4324-8acc-4b48180f8158.png",
      isFavorite: true,
    },
    {
      id: 4,
      name: "MSI B550M-A",
      model: "PRO",
      image: "/lovable-uploads/f6e01227-6636-4324-8acc-4b48180f8158.png",
      isFavorite: true,
    },
    {
      id: 5,
      name: "ASUS TUF Gaming",
      model: "B550M-PLUS",
      image: "/lovable-uploads/f6e01227-6636-4324-8acc-4b48180f8158.png",
      isFavorite: true,
    },
    {
      id: 6,
      name: "ASUS Prime",
      model: "A520M-K",
      image: "/lovable-uploads/f6e01227-6636-4324-8acc-4b48180f8158.png",
      isFavorite: true,
    },
    {
      id: 7,
      name: "Biostar B550MX/E",
      model: "PRO",
      image: "/lovable-uploads/f6e01227-6636-4324-8acc-4b48180f8158.png",
      isFavorite: true,
    },
    {
      id: 8,
      name: "MSI B550M-A",
      model: "PRO",
      image: "/lovable-uploads/f6e01227-6636-4324-8acc-4b48180f8158.png",
      isFavorite: true,
    },
  ]);

  const toggleFavorite = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const handleShare = () => {
    console.log("Compartilhar favoritos");
  };

  const handleGoBack = () => {
    console.log("Voltar para página anterior");
  };

  return (
    <div className="favoritos-content">
      <div className="favoritos-nav">
        <button className="back-button" onClick={handleGoBack}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="favoritos-title">Favoritos</h1>
        <button className="share-button" onClick={handleShare}>
          <span>Compartilhar</span>
          <Share2 size={16} />
        </button>
      </div>

      <div className="products-grid">
        {products
          .filter((product) => product.isFavorite)
          .map((product) => (
            <ProdCard
              key={product.id}
              product={product}
              onToggleFavorite={toggleFavorite}
            />
          ))}
      </div>
    </div>
  );
}

export default Favoritos;
