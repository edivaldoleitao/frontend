import "./ProductDetail.css";
import PriceTable from "../../../components/common/priceTable/PriceTable";
import { Bell, ChevronLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDetail } from "../hooks/useProductDetail";
import { useEffect } from "react";
import Rating from "../../../components/common/rating/Rating";
import ProductTabs from "../../../components/common/productTab/ProductTab";
import { teste, data, lojas } from ".";

function ProductDetailComponent() {
  const { product } = useDetail();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(product);
  }, [product]);

  const rating = 4;
  const reviews = 376;

  if (!product) return null;

  function navigateToPage(page: string) {
    navigate(page);
  }

  return (
    <div>
      <div>
        <div className="contentPage">
          <ChevronLeft className="arrow" onClick={() => navigateToPage("/")} />
          <h1 className="productTittle">{product.name.toUpperCase()}</h1>
          <div className="content">
            <div className="productCard">
              <div className="aspect-square bg-gray-50 rounded-xl mb-6 flex items-center justify-center overflow-hidden group">
                <img
                  src={product.image_url}
                  alt="ASUS TUF Gaming B550M-PLUS Motherboard"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center justify-between">
                <Rating rating={rating} review={reviews} />
                <div className="flex space-x-3">
                  <button className="save">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">Salvar</span>
                  </button>
                  <button className="alert">
                    <Bell className="w-5 h-5" />
                    <span className="text-sm">Ativar alerta</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <PriceTable data={data} />
              <div className="price">
                <span className="text-3xl font-bold">R$899</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <ProductTabs specific_info={teste.specific_info} stores={lojas} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailComponent;
