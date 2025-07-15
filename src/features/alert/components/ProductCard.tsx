import { useState } from "react";
import {
  TrendingDown,
  TrendingUp,
  Bell,
  BellOff,
  Pencil,
  Trash,
} from "lucide-react";
import { Card, CardContent } from "../../../components/common/cards/produtctCard/alert/Card";
import { useUpdateAlert } from "../hooks/useUpdateAlert";
import type { AlertResponse, UpdateAlertPayload } from "../types/type";
import { deleteAlert } from "../services/deleteAlert";

interface Product {
  id: number;
  name: string;
  image: string;
  url_product: string;
  desiredPrice: string;
  currentPrice: string;
  is_active: boolean;
}

interface ProductCardProps {
  product: Product;
  onUpdate?: (updated?: AlertResponse) => void; 
}

export const ProductCard = ({ product, onUpdate }: ProductCardProps) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [newPrice, setNewPrice] = useState(product.desiredPrice.replace("R$ ", ""));
  const [isActive, setIsActive] = useState(product.is_active);

  const { update, loading } = useUpdateAlert();

  const desiredValue = parseFloat(product.desiredPrice.replace("R$ ", "").replace(",", "."));
  const currentValue = parseFloat(product.currentPrice.replace("R$ ", "").replace(",", "."));
  const isPriceBelow = currentValue <= desiredValue;
  const cardStyle = !isActive ? "opacity-50 scale-[0.97] pointer-events-none" : "";

  const handleSave = async () => {
    const payload: UpdateAlertPayload = {
      desired_price: newPrice.replace(",", "."),
      is_active: isActive,
    };

    const response = await update(product.id, payload);
    if (response) {
      setShowEdit(false);
      setIsActive(response.is_active);
      onUpdate?.(response);
    }
  };

  return (
    <>
      <div className="relative">
        <Card className={`bg-white border border-gray-200 shadow-md rounded-2xl transition-shadow hover:shadow-lg font-roboto ${cardStyle}`}>
          <CardContent className="p-5 flex flex-col gap-4">
            <div className="relative bg-muted rounded-xl overflow-hidden aspect-square flex items-center justify-center">
              <a
                href={product.url_product}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square flex items-center justify-center"
              >
                <img
                  src={product.image}
                  alt={`Imagem de ${product.name}`}
                  className="w-full h-full object-contain p-4"
                />
              </a>

              <div className="absolute top-2 right-2 flex items-center gap-2 bg-white/80 rounded-full p-1 shadow-sm backdrop-blur">
                {isActive ? (
                  <Bell className="h-4 w-4 text-[#1F4BC2]" />
                ) : (
                  <BellOff className="h-4 w-4 text-muted-foreground" />
                )}
                <button
                  onClick={() => setShowEdit(true)}
                  className="text-xs text-[#1F4BC2] hover:underline flex items-center gap-1"
                >
                  <Pencil className="h-3 w-3" />
                  Editar
                </button>
                <button
                  onClick={() => setShowDelete(true)}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1"
                >
                  <Trash className="h-3 w-3" />
                  Excluir
                </button>
              </div>
            </div>

            <h3 className="text-base font-bold text-foreground line-clamp-2 min-h-[3.5rem]">
              {product.name}
            </h3>

            <div className="border-t border-border my-1" />

            <div className="flex justify-between text-sm">
              <span className="font-bold text-[#1F4BC2]">Status:</span>
              <span className="text-foreground font-bold">{isActive ? "Ativo" : "Inativo"}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="font-bold text-[#1F4BC2]">Preço desejado:</span>
              <span className="text-foreground font-bold">{product.desiredPrice}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="font-bold text-[#1F4BC2]">Preço atual:</span>
              <div className="flex items-center gap-1 font-bold text-foreground">
                {isPriceBelow ? (
                  <TrendingDown className="h-4 w-4 text-success" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-warning" />
                )}
                <span className={isPriceBelow ? "text-success" : "text-warning"}>
                  {product.currentPrice}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={async () => {
                const response = await update(product.id, { is_active: true });
                if (response) {
                  setIsActive(true);
                  onUpdate?.(response);
                }
              }}
              className="bg-[#1F4BC2] text-white font-semibold text-sm px-4 py-2 rounded shadow-md hover:bg-blue-800 transition"
            >
              Reativar Alerta
            </button>
          </div>
        )}
      </div>

      {showEdit && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-4 text-[#1F4BC2]">Editar Alerta</h2>

            <label className="block mb-2 font-semibold text-sm text-[#1F4BC2]">
              Novo preço desejado:
            </label>
            <input
              type="text"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
            />

            <label className="flex items-center gap-2 text-sm text-[#1F4BC2] font-semibold">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
              Alerta ativo
            </label>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="text-sm px-4 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowEdit(false)}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                className="text-sm px-4 py-1 rounded bg-[#1F4BC2] text-white font-semibold"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md p-6 w-[90%] max-w-md text-center">
            <h2 className="text-lg font-bold text-red-600 mb-4">Excluir Alerta</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Tem certeza que deseja excluir este alerta? Essa ação não pode ser desfeita.
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="text-sm px-4 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowDelete(false)}
              >
                Cancelar
              </button>
              <button
                className="text-sm px-4 py-1 rounded bg-red-600 text-white font-semibold"
                onClick={async () => {
                  try {
                    await deleteAlert(product.id);
                    setShowDelete(false);
                    onUpdate?.(); 
                  } catch (error) {
                    console.error("Erro ao excluir alerta:", error);
                  }
                }}
              >
                Excluir
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
