import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type {
  favoriteCheck,
  favoriteCheckResponse,
  favoriteProps,
  favoriteRequest,
  responseCreateFav,
} from "./index.ts";
import { apiRequest } from "../../../service/api.ts";

function Favorite({
  product,
  miniature,
  setType,
  setError,
  user,
}: favoriteProps) {
  const [isFavorited, setFavorited] = useState(false);
  const [id_fav, setId] = useState<number>();

  useEffect(() => {
    const CheckFavorite = async () => {
      if (user) {
        const data: favoriteCheck = {
          user_id: user.id,
          product_id: product.id,
        };
        try {
          const response = await apiRequest<favoriteCheckResponse>(
            "/favorites/user/",
            {
              method: "POST",
              data: data,
            }
          );
          if (response.favorite && response.id_fav) {
            setFavorited(response.favorite);
            setId(response.id_fav);
          }
        } catch (error) {
          console.error("Erro na busca do favorito:", error);
        }
      }
    };
    CheckFavorite();
  }, [user]);

  const handleFavorite = async () => {
    if (user) {
      if (isFavorited) {
        try {
          await apiRequest(`/favorites/delete/${id_fav}/`, {
            method: "DELETE",
          });

          setFavorited(false);
          setType("success");
          setError("Produto removido dos favoritos com sucesso!");
        } catch (err: any) {
          setType("error");
          setError(
            "Erro ao retirar o produto do favorito, Tente novamente mais tarde!"
          );
          console.error("Erro na busca do produto:", err);
        }
        return;
      }

      const dataRequest: favoriteRequest = {
        user_id: user.id,
        product_id: product.id,
        created_at: new Date().toISOString().slice(0, 10),
      };
      try {
        const responseCreateFav = await apiRequest<responseCreateFav>(
          "/favorites/create/",
          {
            method: "POST",
            data: dataRequest,
          }
        );
        setId(responseCreateFav.id);
        setFavorited(true);
        setType("success");
        setError("Produto favoritado com sucesso!");
      } catch (err: any) {
        setType("error");
        setError(
          "Não foi possível favoritar este produto no momento, tente novamente mais tarde"
        );
        console.error("Erro na busca do produto:", err);
      }
    } else {
      setType("warning");
      setError("É necessário estar logado para favoritar o produto");
    }
  };

  return (
    <button className="save" onClick={handleFavorite}>
      <Heart
        className={`w-5 h-5 transition-all ${
          isFavorited ? "fill-red-500 text-red-500" : ""
        }`}
        fill={isFavorited ? "currentColor" : "none"}
      />
      <span className="text-sm">{miniature ? "" : "Salvar"}</span>
    </button>
  );
}

export default Favorite;
