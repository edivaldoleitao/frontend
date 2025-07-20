import HomeLayout from "../../components/layouts/homeLayout";
import Edit from "../../features/editProfile/components/EditForm";

const EditProfile = () => {
  return (
    <HomeLayout showSearch={false}>
      <Edit />
    </HomeLayout>
  );
};

export default EditProfile;
