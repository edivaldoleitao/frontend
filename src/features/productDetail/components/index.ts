import imgTeste from "../../../assets/placaTeste.png";

export { imgTeste };

interface BaseProductResponse {
  name: string;
  description: string;
  image_url: string;
  brand: string;
  id: string;
  price: number;
}

export interface fetchPrdouctResponse {
  name: string;
  category: string;
  description: string;
  image_url: string;
  brand: string;
  specific_details: {
    model: string;
    vram: number;
    chipset: string;
    max_resolution: string;
    output: string;
    tech_support: string;
  };
}

export interface ProductDatailLayout {
  name: string;
  category: string;
  description: string;
  image_url: string;
  brand: string;
  specific_details: string[];
  rating: number;
  reviewCount: number;
}

export const teste = {
  name: "Placa de Vídeo XFX AMD RADEON RX 7600 Gaming Graphics Card",
  price: "2117.64",
  url: "https://www.kabum.com.br/produto/723235/placa-de-video-xfx-amd-radeon-rx-7600-gaming-graphics-card-8gb-gddr6-rx-76pmbabfy",
  img_url:
    "https://images5.kabum.com.br/produtos/fotos/723235/placa-de-video-amd-radeon-rx-7600-gaming-graphics-card-8gb-gddr6-rx-76pmbabfy_1740593267_p.jpg",
  brand: "XFX",
  description:
    "A arquitetura AMD RDNA potencializa os jogos\n\nA arquitetura AMD RDNA foi projetada para a   próxima geração de jogos eficientes de alto desempenho. É o DNA que alimenta seus jogos, o DNA que dá vida aos seus jogos, o DNA que continua evoluindo. Experimente avanços de última geração em desempenho e eficiência com a nova arquitetura AMD RDNA 3, apresentada nos gráficos AMD Radeon™ RX 7000 Series.",
  specific_info: {
    model: "RX-76PMBABFY",
    vram: "8GB GDDR6",
    chipset: "AMD/NVIDIA",
    max_resolution: "1920x1080",
    output: "HDMI, DisplayPort",
    tech_support: "DirectX 12, OpenGL 4.6",
  },
};

export const data = [
  { date: "Jan", price: 2150.0 }, // Levemente acima do base
  { date: "Feb", price: 2100.0 }, // Abaixo
  { date: "Mar", price: 2080.0 }, // Mais baixo, talvez uma promoção
  { date: "Apr", price: 2120.0 }, // Subida
  { date: "May", price: 2180.0 }, // Subindo mais
  { date: "Jun", price: 2200.0 }, // Picos de demanda
  { date: "Jul", price: 2170.0 }, // Leve queda após pico
  { date: "Aug", price: 2130.0 }, // Estabilizando
  { date: "Sep", price: 2110.0 }, // Próximo ao valor base
  { date: "Oct", price: 2090.0 }, // Promoção ou queda de preço
  { date: "Nov", price: 2140.0 }, // Black Friday / Alta demanda novamente
  { date: "Dec", price: 2190.0 }, // Fim de ano, alta demanda
];

export const lojas = {
  Amazon: 2000,
  Kabum: 2200,
  Terabite: 2200,
};
