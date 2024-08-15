import axios from "axios";
import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


export const axiosSecure = axios.create({
    baseURL: 'https://server-theta-umber.vercel.app/'
  

})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    // const {logOut} = useAuth();
    const {logOut} = useContext(AuthContext);

    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        // console.log('request by interceptors', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    },function(error){
        // Do something with request error
        return Promise.reject(error);
    });

    // interceptors 401 and 403  status 
    axiosSecure.interceptors.response.use(function(response){
        return response
    }, async(error) =>{
        const status = error.response.status;
        console.log('status error in the interceptors',  status);
        // for 401  or 403  logout the user and move user to login page 
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
    })



    return axiosSecure;

}
export default useAxiosSecure;