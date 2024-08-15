import { Outlet } from "react-router-dom";
import Footer from "../../Footer/Footer";


const DashboardRoots = () => {
    return (
        <div>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default DashboardRoots;