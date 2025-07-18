import HomeLayout from "../../../components/layouts/homeLayout";
import ChangePassword from "../../../features/forgotPassword/changePassword/components/ChangePassword";

const ChangePasswordPage = () => {
  return (
    <HomeLayout showSearch={false}>
      <ChangePassword />
    </HomeLayout>
  );
};

export default ChangePasswordPage;
