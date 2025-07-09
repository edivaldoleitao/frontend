import { X } from "lucide-react";
import { AlertMessage } from "../alert/AlertMessage";
import type { AlertConfigModalProps } from "./index";
import { usePriceAlert } from "./usePriceAlert";
import { useEffect } from "react";

const AlertConfigModal = ({
  isOpen,
  onClose,
  alert,
  setAlert,
  user,
  id_product,
}: AlertConfigModalProps) => {
  const {
    type_alert,
    error,
    setError,
    expectedPrice,
    setExpectedPrice,
    duration,
    setDuration,
    loading,
    setUser,
    setProduct,
    dateExpire,
    setDateExpire,
    priceExpected,
    setPrice,
    handleSave,
    handleDelete,
  } = usePriceAlert({ alert: alert, setAlert: setAlert });

  useEffect(() => {
    setAlert(alert);
    if (alert) {
      setDateExpire(alert.expires_at);
      setPrice(String(alert.desired_price));
    }
    setProduct(id_product);
    setUser(user);
  }, [id_product, user, alert]);

  if (!isOpen) return null;

  const close = () => {
    setError("");
    onClose();
  };

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, "");
    if (numericValue === "") return "";

    const formattedValue = (parseInt(numericValue) / 100).toFixed(2);
    return formattedValue.replace(",", ".");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPrice(e.target.value);
    setExpectedPrice(formatted);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50 p-4">
      <div className="w-[25%]">
        {error && (
          <AlertMessage
            type={type_alert}
            message={error}
            onClose={() => setError("")}
          />
        )}
      </div>
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <form onSubmit={handleSave}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Configurar Alerta
            </h2>
            <button
              onClick={close}
              className="text-gray-500 hover:bg-gray-100 p-2 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="expected-price"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Preço Esperado:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  R$
                </span>
                <input
                  id="expected-price"
                  type="text"
                  value={expectedPrice}
                  onChange={handlePriceChange}
                  placeholder="0,00"
                  className="pl-10 h-12 w-full text-lg border-2 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Duração do Alerta:
              </label>
              <div className="space-y-2">
                {[
                  { value: 1, label: "1 mês" },
                  { value: 3, label: "3 meses" },
                  { value: 6, label: "6 meses" },
                  { value: 12, label: "12 meses" },
                ].map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      id={`duration-${option.value}`}
                      name="duration"
                      value={option.value}
                      checked={duration === option.value}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`duration-${option.value}`}
                      className="text-sm cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {alert ? (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-3 block">
                    Alerta já criado:
                  </div>
                  <div className="text-left  text-gray-800">
                    <li>Valor esperado: {priceExpected}</li>
                    <li>Válido até: {dateExpire}</li>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-row">
              {alert ? (
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="w-full m-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 text-base rounded-md transition-colors"
                >
                  {loading ? "EXCLUINDO..." : "EXCLUIR"}
                </button>
              ) : (
                ""
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full m-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 text-base rounded-md transition-colors"
              >
                {loading ? "SALVANDO..." : alert ? "ATUALIZAR" : "SALVAR"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertConfigModal;
