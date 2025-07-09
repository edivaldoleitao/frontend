import "./ProductDetail.css";
import PriceTable from "../../../components/common/priceTable/PriceTable";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDetail } from "../hooks/useProductDetail";
import Rating from "../../../components/common/rating/Rating";
import ProductTabs from "../../../components/common/productTab/ProductTab";
import Error from "../../../components/layouts/error/Error";
import { AlertMessage } from "../../../components/common/alert/AlertMessage";
import { useState } from "react";
import AlertConfigModal from "../../../components/common/configPriceAlert/PriceAlert";
import Favorite from "../../../components/common/favorite/Favorite";
import PriceAlertBTN from "../../../components/common/configPriceAlert/PriceAlertbtn.tsx";

function ProductDetailComponent() {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const {
    user,
    product,
    imgStore,
    loading,
    error,
    setError,
    type_alert,
    setType,
    alert,
    setAlert,
  } = useDetail();
  const navigate = useNavigate();

  if (loading) return <div className="text-4xl p-5">Carregando...</div>;

  if (!product)
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-[50%]">
          {error && (
            <AlertMessage
              type={type_alert}
              message={error}
              onClose={() => setError("")}
            />
          )}
        </div>
        <Error />
      </div>
    );

  function navigateToPage(page: string) {
    navigate(page);
  }
  return (
    <div>
      <div>
        <div className="contentPage">
          {error && (
            <AlertMessage
              type={type_alert}
              message={error}
              onClose={() => setError("")}
            />
          )}
          <ChevronLeft className="arrow" onClick={() => navigateToPage("/")} />
          <h1 className="productTittle">
            {product.product.name.toUpperCase()}
          </h1>
          <div className="content">
            <div className="productCard">
              <div className="aspect-square bg-gray-50 rounded-xl mb-6 flex items-center justify-center overflow-hidden group">
                <img
                  src={product.product.image_url}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="infoProduct">
                <Rating
                  rating={product.product_store.rating}
                  review="Falta coletar"
                />
                <div className="flex space-x-3 max-[400]:flex-col">
                  <Favorite
                    product={product.product}
                    miniature={false}
                    isOpen={false}
                    setType={setType}
                    setError={setError}
                    user={user}
                  />
                  <PriceAlertBTN
                    product={product.product}
                    setIsAlertModalOpen={setIsAlertModalOpen}
                    miniature={false}
                    alert={alert}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <PriceTable data={product.price_history} />
              <div
                className="price  hover:bg-blue-300"
                onClick={() =>
                  window.open(product.product_store.url_product, "_blank")
                }
              >
                <img src={imgStore} className="h-10" />
                <span className="text-3xl font-bold">
                  R$ {product.price.value}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <ProductTabs
            specific_info={product.product.specific_details}
            stores={product.other_stores}
            description={product.product.description}
          />
        </div>
      </div>
      <AlertConfigModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        productName={product.product.name}
        alert={alert}
        user={user}
        id_product={product.product.id}
        setAlert={setAlert}
      />
    </div>
  );
}

export default ProductDetailComponent;
