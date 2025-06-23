import Sidebar from "../../components/common/sideBar";
import { Initial } from "../../features/initial/components";


const InitialPage = () => {
    return (
        <div className="min-h-screen flex bg-gradient-to-br">
            <Sidebar />
            <Initial />
        </div>
    )
}

export default InitialPage