import HomeLayout from "../../components/layouts/homeLayout/HomeLayout.tsx";
import ProductDetailComponent from "../../features/productDetail/components/ProductDetail.tsx";

const ProductPage = () => {
  return (
    <div>
      <HomeLayout>
        <ProductDetailComponent />
      </HomeLayout>
    </div>
  );
};

export default ProductPage;
