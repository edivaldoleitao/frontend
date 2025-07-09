import UpgradeChat from "../../features/upgrade/components/UpgradeChat";
import Sidebar from "../../components/common/sideBar";

const UpgradePage = () => {
  return (
    <div className="min-h-screen h-screen flex">
      <Sidebar />

      <div className="flex flex-col flex-1 justify-end items-end h-full">
        <div className="w-full">
          <UpgradeChat />
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
