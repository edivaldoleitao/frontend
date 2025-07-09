import type { AlertBTNProps } from "./index.ts";
import { Bell } from "lucide-react";

const PriceAlertBTN = ({
  setIsAlertModalOpen,
  miniature,
  alert,
}: AlertBTNProps) => {
  return (
    <button className="alert" onClick={() => setIsAlertModalOpen(true)}>
      <Bell
        className={`w-5 h-5 transition-all ${
          alert ? "fill-blue-600 text-blue-600" : ""
        }`}
      />
      <span className="text-sm">
        {miniature ? "" : `${alert ? "Checar Alerta" : "Ativar Alerta"}`}
      </span>
    </button>
  );
};

export default PriceAlertBTN;
