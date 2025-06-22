import HomeLayout from "../../components/layouts/homeLayout";
import { Home } from "../../features/home/components";



export default function HomePage(){
    return(
        <HomeLayout>
            <Home/>
        </HomeLayout>
    )
}