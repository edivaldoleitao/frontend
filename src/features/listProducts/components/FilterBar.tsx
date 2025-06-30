import { ArrowLeft, SlidersHorizontal } from "lucide-react";

type FilterBarProps = {
  onFilterChange: (filterType: string, value: string) => void;
};

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const filters = [
    { label: "Preço", key: "price", hasDropdown: true, options: ["0-499", "500-799", "800-999"] },
    { label: "Site", key: "seller", hasDropdown: true, options: ["Kabum", "Amazon", "Terabyte"] },
    { label: "Avaliação", key: "rating", hasDropdown: true, options: ["5", "4", "3"] },
    { label: "Marca", key: "brand", hasDropdown: true, options: ["ASUS", "MSI", "Biostar"] },
  ];

  return (
    <div className="p-4">
      <div className="container mx-auto flex items-center space-x-4 flex-wrap">
        <button className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
          <span>Todos os filtros</span>
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        {filters.map((filter, index) =>
          filter.hasDropdown ? (
            <select
              key={index}
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <button
              key={index}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              <span>{filter.label}</span>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default FilterBar;
