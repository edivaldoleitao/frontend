import RecommendationsSection from "./RecommendationsSection";
import MostSearchedSection from "./MostSearchedSection";


const mockProducts = [
  {
    id: 1,
    image: "/placeholder.svg",
    name: "MSI B550M-A PRO",
    price: "R$ 699,90",
    rating: 5,
    reviews: 189
  },
  {
    id: 2,
    image: "/placeholder.svg",
    name: "Biostar B550MX/E PRO",
    price: "R$ 679,90",
    rating: 5,
    reviews: 215
  },
  {
    id: 3,
    image: "/placeholder.svg",
    name: "ASUS TUF Gaming B550M-PLUS",
    price: "R$ 899,90",
    rating: 5,
    reviews: 349
  }
];

export default function Home() {
  return (
      <div className="max-w-6xl mx-auto ">
        <RecommendationsSection products={mockProducts} />
        <MostSearchedSection />
      </div>
  );
}
