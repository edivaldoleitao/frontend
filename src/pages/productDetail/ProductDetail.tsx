import AppBar from "../../components/common/appBar/index.ts";
import ProductDetailComponent from "../../features/productDetail/components/ProductDetail.tsx";

const ProductPage = () => {
  return (
    <div>
      <AppBar />
      <ProductDetailComponent />
    </div>
  );
};

export default ProductPage;
