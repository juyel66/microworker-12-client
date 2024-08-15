import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Roots = () => {
  const location = useLocation();
  // console.log(location);
  const noNavbarAndFooter =
    location.pathname.includes("login") || location.pathname.includes("register");
  return (
    <div>
      {/* <Navbar></Navbar>
            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer> */}

      {noNavbarAndFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noNavbarAndFooter || <Footer></Footer>}
    </div>
  );
};

export default Roots;
