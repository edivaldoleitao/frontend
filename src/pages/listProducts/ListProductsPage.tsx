import { useSearchParams } from "react-router-dom";
import HomeLayout from "../../components/layouts/homeLayout";
import ProductList from "../../features/listProducts/components/ProductList";

const ListProductsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const searchTerm = category || query;
  const isCategory = Boolean(category);

  return (
    <HomeLayout>
      <ProductList
        searchQuery={searchTerm}
        isCategory={isCategory}
      />
    </HomeLayout>
  );
};

export default ListProductsPage;

