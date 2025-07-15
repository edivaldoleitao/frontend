import { useTopRatedProducts } from "../hook/useTopRatedProducts";
import RecommendationsSection from "./RecommendationsSection";

export default function Home() {
  const { data, loading } = useTopRatedProducts(10);

  if (loading) return <div>Carregando...</div>;


  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>

            <div className="relative z-10 max-w-3xl text-left">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white mb-4 gap-2">
                🤖 Inteligência Artificial Aplicada
              </span>

              <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                IA que entende o que você<br /> realmente precisa
              </h2>

              <p className="text-lg text-white/90">
                O <strong>TrackSave</strong> analisa avaliações, monitora preços e recomenda os melhores produtos com
                base em dados reais — tudo com inteligência artificial.
              </p>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 translate-x-16"></div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            {data && (
              <RecommendationsSection products={data} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
