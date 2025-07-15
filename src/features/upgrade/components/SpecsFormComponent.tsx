import React from "react";
import roboBot from "../../../assets/trackbot.png";
import type { UserSpecification } from "../types/type";

export interface SpecsForm {
  placaMae: string;
  processador: string;
  memoriaRAM: string;
  placaVideo: string;
  ssd: string;
  hd: string;
  fonte: string;
  cooler: string;
  hasPlacaVideo: boolean;
  hasSSD: boolean;
  hasHD: boolean;
}

interface Props {
  specsForm: SpecsForm;
  onChange: (field: keyof SpecsForm, value: string | boolean) => void;
  onSubmit: (data: UserSpecification) => void;
  userId: number;
}

const SpecsFormComponent: React.FC<Props> = ({ specsForm, onChange, onSubmit, userId }) => {
  const handleSubmit = () => {
    const data: UserSpecification = {
      user_id: userId,
      cpu: specsForm.processador,
      ram: specsForm.memoriaRAM,
      motherboard: specsForm.placaMae,
      psu: specsForm.fonte,
      cooler: specsForm.cooler || undefined,
      gpu: specsForm.hasPlacaVideo ? specsForm.placaVideo : undefined,
      storage: specsForm.hasSSD
        ? specsForm.ssd
        : specsForm.hasHD
          ? specsForm.hd
          : undefined,
    };

    onSubmit(data);
  };

  return (
    <div className="space-y-3 mb-6">
      <div className="flex justify-start">
        <div className="flex items-start space-x-2 max-w-full lg:max-w-2xl">
          <img src={roboBot} alt="TrackBot" className="w-8 h-8 rounded-full" />

          <div className="bg-gradient-to-br from-[#7B5ED3] to-[#5536A7] rounded-2xl shadow-lg p-6 text-white w-full">
            <h3 className="text-lg font-semibold mb-4 text-left">
              Me conta quais são as especificações do computador
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { label: "Placa-mãe", field: "placaMae" },
                { label: "Processador", field: "processador" },
                { label: "Memória RAM", field: "memoriaRAM" },
                { label: "Fonte", field: "fonte" },
                { label: "Cooler", field: "cooler" },
              ].map(({ label, field }) => (
                <div key={field} className="text-left">
                  <label className="block text-sm font-medium mb-2 text-white">{label}</label>
                  <input
                    type="text"
                    placeholder="Informe o modelo"
                    value={specsForm[field as keyof SpecsForm] as string}
                    onChange={(e) => onChange(field as keyof SpecsForm, e.target.value)}
                    className="w-full px-3 py-2 rounded-full bg-white text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
              ))}

              {["placaVideo", "ssd", "hd"].map((key) => {
                const overrideKey = {
                  placaVideo: "hasPlacaVideo",
                  ssd: "hasSSD",
                  hd: "hasHD",
                } as const;

                const hasKey = overrideKey[key as keyof typeof overrideKey];
                const label = key === "placaVideo" ? "Placa de Vídeo" : key.toUpperCase();

                return (
                  <div key={key} className="text-left">
                    <label className="block text-sm font-medium mb-2 text-white">
                      {label}
                    </label>
                    <input
                      type="text"
                      placeholder="Informe o modelo"
                      value={specsForm[key as keyof SpecsForm] as string}
                      onChange={(e) => onChange(key as keyof SpecsForm, e.target.value)}
                      disabled={!specsForm[hasKey]}
                      className={`w-full px-3 py-2 rounded-full text-sm focus:outline-none ${specsForm[hasKey]
                        ? "bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-white/30"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                    />
                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id={`has${key}`}
                        checked={specsForm[hasKey] === false}
                        onChange={(e) => onChange(hasKey, !e.target.checked)}
                        className="mr-2 accent-white"
                      />
                      <label htmlFor={`has${key}`} className="text-xs text-white/80">
                        Não tenho esse componente
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecsFormComponent;
