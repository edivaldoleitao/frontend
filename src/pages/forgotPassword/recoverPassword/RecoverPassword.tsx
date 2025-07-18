import HomeLayout from "../../../components/layouts/homeLayout";
import RecoverPassword from "../../../features/forgotPassword/recoverPassword/components/RecoverPassword";

const RecoverPasswordPage = () => {
  return (
    <HomeLayout showSearch={false}>
      <RecoverPassword />
    </HomeLayout>
  );
};

export default RecoverPasswordPage;
