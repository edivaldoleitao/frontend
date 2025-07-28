import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { PriceEntry } from "../../../features/productDetail/types/productDetail";
import { X, Maximize2 } from "lucide-react";

interface PriceTableProps {
  data: PriceEntry[];
}

// Componente Modal para o gráfico expandido
const ChartModal = ({ 
  isOpen, 
  onClose, 
  data, 
  selectedPeriod 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  data: any[]; 
  selectedPeriod: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col">
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Evolução dos preços - {selectedPeriod === "1m" ? "1 mês" : selectedPeriod === "3m" ? "3 meses" : selectedPeriod === "6m" ? "6 meses" : "12 meses"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="flex-1 p-6">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis
                  dataKey="collection_date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 14, fill: "#666" }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 14, fill: "#666" }}
                  domain={["dataMin - 10", "dataMax + 10"]}
                  tickFormatter={(value) => `R$ ${value.toFixed(0)}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e40af",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  labelStyle={{ color: "white" }}
                  itemStyle={{ color: "white" }}
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Preço"]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1e40af"
                  strokeWidth={4}
                  dot={{ fill: "#1e40af", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: "#1e40af", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Nenhum dado disponível para o período selecionado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PriceTable = ({ data }: PriceTableProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<"1m" | "3m" | "6m" | "12m">("6m");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debug: Log dos dados recebidos
  console.log("PriceTable - Dados recebidos:", data);
  console.log("PriceTable - Tipo dos dados:", typeof data);
  console.log("PriceTable - É array?", Array.isArray(data));

  // Função para filtrar dados por período
  const filteredData = useMemo(() => {
    console.log("PriceTable - Filtrando dados...");
    console.log("PriceTable - Dados originais:", data);
    
    if (!data || data.length === 0) {
      console.log("PriceTable - Dados vazios ou nulos");
      return [];
    }
    
    const now = new Date();
    const periods: Record<"1m" | "3m" | "6m" | "12m", Date> = {
      "1m": new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()),
      "3m": new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()),
      "6m": new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()),
      "12m": new Date(now.getFullYear(), now.getMonth() - 12, now.getDate()),
    };

    const cutoffDate = periods[selectedPeriod];
    console.log("PriceTable - Data de corte:", cutoffDate);
    console.log("PriceTable - Período selecionado:", selectedPeriod);
    
    const filtered = data
      .filter((entry: PriceEntry) => {
        const entryDate = new Date(entry.collection_date);
        const isInRange = entryDate >= cutoffDate;
        console.log("PriceTable - Verificando entrada:", entry, "Data:", entryDate, "Em range:", isInRange);
        return isInRange;
      })
      .map((entry: PriceEntry) => {
        // Converter string para número e tratar possíveis erros
        const numericValue = parseFloat(entry.value.replace(/[^\d.,]/g, '').replace(',', '.'));
        const formattedDate = new Date(entry.collection_date).toLocaleDateString('pt-BR', {
          month: 'short',
          day: 'numeric'
        });
        
        console.log("PriceTable - Processando entrada:", entry, "Valor numérico:", numericValue, "Data formatada:", formattedDate);
        
        return {
          ...entry,
          value: numericValue,
          collection_date: formattedDate
        };
      })
      .filter(item => !isNaN(item.value)) // Remover itens com valores inválidos
      .sort((a: any, b: any) => new Date(a.collection_date).getTime() - new Date(b.collection_date).getTime());
    
    console.log("PriceTable - Dados filtrados:", filtered);
    return filtered;
  }, [data, selectedPeriod]);

  // Calcular estatísticas
  const stats = useMemo(() => {
    if (filteredData.length === 0) return null;
    
    const values = filteredData.map((d: any) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const current = values[values.length - 1];
    const previous = values[0];
    const change = current - previous;
    const changePercent = ((change / previous) * 100);
    
    return {
      min,
      max,
      current,
      change,
      changePercent,
      isPositive: change >= 0
    };
  }, [filteredData]);

  // Calcular largura mínima do gráfico baseada no número de dados
  const chartWidth = Math.max(600, filteredData.length * 50);

  console.log("PriceTable - Dados finais para o gráfico:", filteredData);
  console.log("PriceTable - Largura do gráfico:", chartWidth);

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-0">
            Evolução dos preços
          </h3>
          
          <div className="flex items-center space-x-2">
            {/* Botões de filtro de período */}
            <div className="flex space-x-2">
              {(["1m", "3m", "6m", "12m"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {period === "1m" ? "1 mês" : period === "3m" ? "3 meses" : period === "6m" ? "6 meses" : "12 meses"}
                </button>
              ))}
            </div>

            {/* Botão de expandir */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="Expandir gráfico"
            >
              <Maximize2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Estatísticas do período */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Preço atual</div>
              <div className="text-lg font-semibold text-gray-800">
                R$ {stats.current.toFixed(2)}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Menor preço</div>
              <div className="text-lg font-semibold text-green-600">
                R$ {stats.min.toFixed(2)}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Maior preço</div>
              <div className="text-lg font-semibold text-red-600">
                R$ {stats.max.toFixed(2)}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Variação</div>
              <div className={`text-lg font-semibold ${stats.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stats.isPositive ? '+' : ''}R$ {stats.change.toFixed(2)}
                <span className="text-sm ml-1">
                  ({stats.isPositive ? '+' : ''}{stats.changePercent.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Debug: Mostrar informações sobre os dados */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Dados recebidos: {data?.length || 0} | 
            Dados filtrados: {filteredData.length} | 
            Período: {selectedPeriod}
          </p>
        </div>

        {/* Container do gráfico com scroll horizontal */}
        <div className="relative">
          <div className="h-64 overflow-x-auto overflow-y-hidden">
            {/* <div style={{ width: `${chartWidth}px`, minWidth: '100%' }}> */}
              {filteredData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData}>
                    <XAxis
                      dataKey="collection_date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#666" }}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#666" }}
                      domain={["dataMin - 10", "dataMax + 10"]}
                      tickFormatter={(value) => `R$ ${value.toFixed(0)}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e40af",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                      labelStyle={{ color: "white" }}
                      itemStyle={{ color: "white" }}
                      formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Preço"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#1e40af"
                      strokeWidth={3}
                      dot={{ fill: "#1e40af", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#1e40af", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Nenhum dado disponível para o período selecionado</p>
                </div>
              )}
            {/* </div> */}
          </div>
          
          {/* Indicador de scroll */}
          {filteredData.length > 12 && (
            <div className="mt-2 text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>Deslize horizontalmente para ver mais dados</span>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal do gráfico expandido */}
      <ChartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={filteredData}
        selectedPeriod={selectedPeriod}
      />
    </>
  );
};

export default PriceTable;