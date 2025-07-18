import HomeLayout from "../../components/layouts/homeLayout";
import NotFoundImage from "../../assets/404.png";

const NotFoundPage = () => {
  return (
    <HomeLayout showSearch={false} showFooter={false}>
      <img
        src={NotFoundImage}
        alt="Page Not Found 404"
        className="w-100 h-150 mx-auto my-20"
      />
    </HomeLayout>
  );
};

export default NotFoundPage;
