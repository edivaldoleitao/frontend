import HomeLayout from "../../components/layouts/homeLayout";
import Favoritos from "../../features/favorite/components/Favorite";

const FavoritePage = () => {
  return (
    <HomeLayout showSearch={false}>
      <Favoritos />
    </HomeLayout>
  );
};

export default FavoritePage;
