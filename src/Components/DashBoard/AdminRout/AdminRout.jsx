import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Home/useAuth";
import useAdmin from "../../Hook/useAdmin";


const AdminRout = ({children}) => {
    // const [user, loading] = useAuth();
    const {user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin();
  
    const location = useLocation()
    if(loading || isAdminLoading){
        return <div className="flex mt-40 justify-center"><span className="loading  loading-spinner w-40 "></span> </div>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to ='/' state={{from: location}} replace></Navigate>
};

export default AdminRout;