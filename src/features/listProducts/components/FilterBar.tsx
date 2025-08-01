import { ArrowLeft, SlidersHorizontal } from "lucide-react";

type FilterBarProps = {
  onFilterChange: (filterType: string, value: string) => void;
};

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const filters = [
    {
      label: "Preço",
      key: "price",
      hasDropdown: true,
      options: [
        "0-499",
        "500-799",
        "800-999",
        "1000-1499",
        "1500-1999",
        "2000-2999",
        "3000-4999",
        "5000-9999",
        "10000-"
      ]
    },
    {
      label: "Site",
      key: "seller",
      hasDropdown: true,
      options: ["Kabum", "Amazon"]
    },
    {
      label: "Avaliação",
      key: "rating",
      hasDropdown: true,
      options: ["5", "4", "3"]
    },
    {
      label: "Marca",
      key: "brand",
      hasDropdown: true,
      options: [
        "ASRock",
        "ASUS",
        "Corsair",
        "GALAX",
        "Gigabyte",
        "HP",
        "Husky",
        "Inno3D",
        "Intel",
        "Kingston",
        "Kingston FURY",
        "Lexar",
        "MSI",
        "Palit",
        "PCYES",
        "PowerColor",
        "Redragon",
        "Rise Mode",
        "Rise Mode Gamer",
        "Sapphire",
        "Vengeance",
        "XFX",
        "XPG",
        "Adata",
        "AMD",
        "G.Skill",
        "Generic"
      ]

    },
  ];


  return (
    <div className="p-4">
      <div className="container mx-auto w-full flex items-center justify-between flex-wrap gap-4">
        <button className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors shrink-0">
          <span>Todos os filtros</span>
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        {filters.map((filter, index) =>
          filter.hasDropdown ? (
            <select
              key={index}
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors shrink-0"
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
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors shrink-0"
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
