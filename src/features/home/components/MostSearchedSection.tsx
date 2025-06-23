import { Star } from "lucide-react";

export default function MostSearchedSection() {
  const topProduct = {
    position: "1° Lugar",
    image: "/placeholder.svg",
    name: "MSI B550M-A PRO",
    price: "R$ 699,90",
    rating: 5,
    reviews: 140
  };

  return (
    <section className="px-4 py-6">
      <h2 className="text-blue-600 text-4xl font-bold mb-4 text-left">Produtos mais procurados</h2>

      <div className="bg-gray-200 rounded-lg shadow-sm border p-4 flex items-center gap-4">
        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {topProduct.position}
        </div>

        <img
          src={topProduct.image}
          alt={topProduct.name}
          className="w-16 h-16 object-cover rounded-md bg-gray-100"
        />

        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < topProduct.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({topProduct.reviews})</span>
          </div>

          <h3 className="text-sm font-medium text-gray-800 mb-1">{topProduct.name}</h3>
          <span className="text-green-600 font-bold text-lg">{topProduct.price}</span>
        </div>
      </div>
    </section>
  );
}
