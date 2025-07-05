import { useSearchParams } from "react-router-dom";

import HomeLayout from "../../components/layouts/homeLayout";
import ProductList from "../../features/listProducts/components/ProductList";

const ListProductsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <HomeLayout>
      {query && <ProductList searchQuery={query} />}
    </HomeLayout>
  );
};

export default ListProductsPage;
