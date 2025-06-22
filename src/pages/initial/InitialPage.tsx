import Sidebar from "../../components/common/sideBar";
import { Initial } from "../../features/initial/components";

export function InitialPage() {
    return (
        <div className="min-h-screen flex bg-gradient-to-br">
            <Sidebar />
            <Initial />
        </div>
    );
}