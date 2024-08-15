
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Home/useAuth";
import { Player } from "@lottiefiles/react-lottie-player";
// import useAuth from "../Hook/useAuth";


const PrivetRout = ({children}) => {
    const {user,loading} = useAuth()
    const location = useLocation()
    if(loading){
        // return <div className="flex mt-40 justify-center"><span className="loading  loading-spinner w-40 "></span> </div>
        return   <div className="lg:flex justify-center">
        <div className="flex-1 lg:hidden">
          <Player
            autoplay
            loop
            src="https://lottie.host/d53b7a3a-8883-4460-9f16-387491682f1b/1mS2ZVJ0Zj.json"
            style={{ height: "300px", width: "200px" }}
          ></Player>
        </div>

        <div className="lg:flex hidden">
          <Player
            autoplay
            loop
            src="https://lottie.host/d53b7a3a-8883-4460-9f16-387491682f1b/1mS2ZVJ0Zj.json"
            style={{ height: "500px", width: "600px" }}
          ></Player>
        </div>
      </div>
    }
    if(user){ 
        return children;
    }
    return <Navigate to ='/login' state={{from: location}} replace></Navigate>
};

export default PrivetRout;