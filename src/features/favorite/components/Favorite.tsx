import { ChevronLeft, Share2 } from "lucide-react";
import ProdCard from "../../../components/common/productCard/ProdCard";
import "./Favorite.css";
import { useFavorite } from "../hooks/useFavorite.ts";
import { AlertMessage } from "../../../components/common/alert/AlertMessage.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ShareLink from "../../../components/common/shareLinks/ShareLinks.tsx";

function Favoritos() {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const {
    error,
    setError,
    type_alert,
    setType,
    isLoading,
    user,
    edit,
    url,
    products,
  } = useFavorite();

  const navigate = useNavigate();

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  if (isLoading) return <p>Carregando favoritos...</p>;

  return (
    <div className="favoritos-content">
      {error && (
        <AlertMessage
          type={type_alert}
          message={error}
          onClose={() => setError("")}
        />
      )}

      <div className="favoritos-nav">
        <ChevronLeft className="arrow" onClick={() => navigate(-1)} />
        <h1 className="favoritos-title">Favoritos</h1>
        <button className="share-button" onClick={handleShare}>
          <span>Compartilhar</span>
          <Share2 size={16} />
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProdCard
            key={product.product}
            product={product}
            miniature={false}
            isOpen={false}
            setType={setType}
            setError={setError}
            user={user}
            edit={edit}
          />
        ))}
      </div>
      <ShareLink
        isOpen={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        link={url}
      />
    </div>
  );
}

export default Favoritos;
